const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_super_secret_key'; 

app.use(bodyParser.json());

// Dummy user data (replace with a real database)
const users = [
  { id: 1, email: 'abi@example.com', password: 'password123' },
];


// Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ message: 'Forbidden: Invalid or expired token' }); // Invalid token
    }
    req.user = user; // Attach user payload to request
    next();
  });
};

// Protected endpoint
app.get('/protected/data', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}! This is protected data.` });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});