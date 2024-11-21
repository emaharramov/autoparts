const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const data = await db.query("select * from users");
    if (!data) {
      res.status(404).send({
        status: false,
        message: "Data not found...",
      });
    }

    res.status(200).send({
      status: true,
      message: "Users fetched...",
      data: data[0],
      length: data[0].length,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occured...",
      error,
    });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      status: false,
      message: "All fields (username, email, password) are required.",
    });
  }

  try {
    // Şifreyi hashleme
    const hashedPassword = await bcrypt.hash(password, 10); // 10, saltRounds

    // Yeni kullanıcıyı veritabanına eklemek için SQL sorgusu
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    if (result[0].affectedRows > 0) {
      res.status(201).send({
        status: true,
        message: "User created successfully.",
        data: {
          id: result[0].insertId,
          username,
          email,
        },
      });
    } else {
      res.status(500).send({
        status: false,
        message: "Failed to create user.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "An error occurred while creating the user.",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      status: false,
      message: "Email and password are required.",
    });
  }

  try {
    // Veritabanında e-posta ile kullanıcıyı bulma
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(401).send({
        status: false,
        message: "Invalid email or password.",
      });
    }

    // Şifreyi bcrypt ile karşılaştırma
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).send({
        status: false,
        message: "Invalid email or password.",
      });
    }

    const payload = {
      userId: user[0].id,
      username: user[0].username,
      email: user[0].email,
    };

    // JWT token oluşturma
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", 
    });

    res.status(200).send({
      status: true,
      message: "Login successful.",
      data: {
        token, // JWT token
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "An error occurred during login.",
      error,
    });
  }
};

module.exports = { getAllUsers, createUser, loginUser };