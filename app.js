const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
require('express-async-errors');

// const auth = require('./middlewares/auth.mdw');

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

require('./middlewares/routes.mdw')(app);

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello from Sakila'
    })
})

app.get('/err', (req, res) => {
    throw new Error;
})

// app.use('/api/auth', require('./routes/auth.route'));
// app.use('/api/users', require('./routes/user.route'));
// app.use('/api/films', auth, require('./routes/film.route'));
// app.use('/api/actors', require('./routes/actor.route'));
// app.use('/api/cities', require('./routes/city.route'));
// app.use('/api/countries', require('./routes/country.route'));
// app.use('/api/categories', require('./routes/category.route'));

app.use((req, res, next) => {
    res.status(404).json({
        error_message: 'Endpoint not found!'
    });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broken!'
    });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sakila is running at http://localhost:${PORT}`);
})