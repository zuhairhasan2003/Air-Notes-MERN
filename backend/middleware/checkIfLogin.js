var jwt = require('jsonwebtoken');
const JWT_SECRET = "This is developed by zuhair hasan raza";

// This middle ware will be called when ever we are accessing any login required route
// When user is logged in and now wants to see his details
// We will only approve if the user has auth-token in headers
const authLogin = (req, res, next) =>{

    // extract user id from jwt token which is in req header
    let authToken = req.header('auth-token');
    
    var error = {message: ""};
    
    try {
        if(!authToken)
        {
            error.message = "Enter a valid token";
            throw error;
        }
        else
        {
            const user = jwt.verify(authToken, JWT_SECRET);
            req.user = user;
            next();
        }
    } 
    catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = authLogin;