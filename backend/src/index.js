const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const bulkProductRoutes = require('./routes/bulkProduct.r');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api', routes);
app.use('/api/products', bulkProductRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
