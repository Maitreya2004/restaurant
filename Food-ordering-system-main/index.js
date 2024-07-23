const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'food_ordering_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to database');
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON
app.use(express.json());

// Route to get food items
app.get('/api/food-items', (req, res) => {
    db.query('SELECT * FROM food_items', (err, results) => {
        if (err) {
            console.error('Error fetching food items: ',err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

// Route to get cart items
app.get('/api/cart-items', (req, res) => {
    // Assuming you are using some session or token-based authentication for users
    const userId = 1; // For demonstration, using a static user ID
    db.query('SELECT ci.*, f.name, f.price, f.image_url FROM cart_items ci JOIN food_items f ON ci.food_id = f.id WHERE ci.user_id = ?', [userId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
            return;
        }
        res.json(results);
    });
});

// Route to add items to the cart
app.post('/api/cart-items', (req, res) => {
    const { user_id, food_id, quantity } = req.body;
    db.query('INSERT INTO cart_items (user_id, food_id, quantity) VALUES (?, ?, ?)', [user_id, food_id, quantity], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add item to cart' });
            return;
        }
        res.json({ message: 'Item added to cart successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
