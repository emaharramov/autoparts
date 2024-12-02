import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux"; // Import Redux Provider
import store from "./redux/store"; // Import your Redux store
import Login from "./components/Login";
import Main from "./components/Main";
import Layout from "./Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Orders from "./components/Orders";
import About from "./components/About";
import Contact from "./components/Contact";


// ProtectedRoute to ensure the user is authenticated
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    // Wrap the app with both AuthProvider and Redux Provider
    <AuthProvider>
      <Provider store={store}>
        {" "}
        {/* Add the Redux Provider */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/app" element={<Layout />}>
              <Route path="main" element={<Main />} />
              <Route
                path="allproducts/:product_kodu/:id"
                element={<ProductDetails />}
              />
              <Route path="orders" element={<Orders />} />
              <Route path="cart" element={<Cart />} />
              <Route path="about-us" element={<About />} />
              <Route path="contact-us" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;
