const express = require('express');
const app = express();
var cors = require('cors');
app.use(express.json());

const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// All avaliable routes
app.use(cors())
app.use('/auth', require('./routes/auth'));
app.use('/auth/notes', require('./routes/notes'));