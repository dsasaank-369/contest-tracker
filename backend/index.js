const express = require('express');
const cors = require('cors');
const contestRoutes = require('./routes/contests');

const app = express();
const PORT = process.env.PORT || 5000;

process.env.TZ = 'Asia/Kolkata';

app.use(cors());
app.use(express.json());

app.use('/api/contests', contestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
