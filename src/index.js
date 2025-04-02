require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const inquiryRoutes = require('./routes/inquiry');
const contactRoutes = require('./routes/contactRoutes');
const loanRoutes = require('./routes/Loan');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/loans', loanRoutes);
// Database sync and server start
const startServer = async () => {
  try {
    // Force sync to recreate tables
    // await sequelize.sync({ force: true });
    console.log('Database synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
