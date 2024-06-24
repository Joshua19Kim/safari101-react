const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

const users = [];

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.post('/upload', upload.single('image'), (req, res) => {
    res.status(201).send(req.file);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
