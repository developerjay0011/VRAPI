-- Create the database
CREATE DATABASE IF NOT EXISTS loan_landing_page;
USE loan_landing_page;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin') DEFAULT 'admin',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Inquiries table
CREATE TABLE IF NOT EXISTS Inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  loanAmount DECIMAL(10,2) NOT NULL,
  loanType ENUM('personal', 'business', 'home') NOT NULL,
  employmentType ENUM('salaried', 'business') NOT NULL,
  monthlyIncome DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password will be hashed by the application)
INSERT INTO Users (email, password, role) VALUES 
('admin@example.com', 'admin123', 'admin');
