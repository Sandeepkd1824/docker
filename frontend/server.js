const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to show form
app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            <label>Name:</label><br>
            <input type="text" name="name" /><br><br>

            <label>Age:</label><br>
            <input type="number" name="age" /><br><br>

            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to send data to Flask backend
app.post('/submit', (req, res) => {
    const { name, age } = req.body;

    // ERROR ON PURPOSE ↓ (will fix later)
    fetch(process.env.BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age })
    })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => res.send('Error: ' + error));
});

app.listen(port, () => {
    console.log(`Frontend running on port http://localhost:${port}/`);
});
