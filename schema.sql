-- Smartz Spaces Database Schema
-- Import this in Hostinger phpMyAdmin or your MySQL database

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS smartz_spaces CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smartz_spaces;

-- Enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  message TEXT,
  investment_goal VARCHAR(100),
  budget VARCHAR(50),
  preferred_location VARCHAR(100),
  related_project VARCHAR(255),
  form_type VARCHAR(50) NOT NULL,
  source_page VARCHAR(500),
  ip_hash VARCHAR(64),
  user_agent TEXT,
  follow_up_status ENUM('new', 'contacted', 'qualified', 'site-visit', 'closed', 'not-interested') DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (follow_up_status),
  INDEX idx_form_type (form_type),
  INDEX idx_created_at (created_at),
  INDEX idx_related_project (related_project)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL,
  status ENUM('active', 'unsubscribed') DEFAULT 'active',
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin users table (for authentication)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - CHANGE IN PRODUCTION)
-- Run this to generate a proper hash:
-- bcrypt.hash('your-password', 10)
INSERT INTO admin_users (username, password_hash) VALUES
('admin', '$2a$10$placeholder_hash_replace_with_real_bcrypt_hash')
ON DUPLICATE KEY UPDATE username=username;

-- Rate limiting table (optional, for spam protection)
CREATE TABLE IF NOT EXISTS rate_limits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  request_count INT DEFAULT 1,
  window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_identifier_action (identifier, action_type),
  INDEX idx_window_start (window_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
