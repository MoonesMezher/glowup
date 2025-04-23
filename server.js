require("dotenv").config()

const express = require('express');
const path = require('path');
const errorHandling = require('./middlewares/errorHandling');
const notFound = require('./middlewares/notFound');
const cookieParser = require('cookie-parser');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser())

// routers
app.use("/", require("./routes/views.routes"))

app.use("/api/items", require("./routes/items.routes"));

app.use("/api/auth", require("./routes/auth.routes"));

// after middlewares
app.use(notFound);

app.use(errorHandling);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`, `http://localhost:${PORT}`);
});