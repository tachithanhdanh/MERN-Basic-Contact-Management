const asyncHanlder = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateTokenHandler = asyncHanlder(async (req, res, next) => {
  let token = req.cookies.token;
  let authorizationHeader = req.headers.authorization || req.headers.Authorization;
  if (token || (authorizationHeader && authorizationHeader.startsWith('Bearer'))) {
    try {
      if (!token) {
        token = authorizationHeader.split(' ')[1];
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('decoded', decoded);
      // set the user in the request object
      // it will then be available in the route handler
      // since the user is set in the request object
      // every route that uses this middleware will have access to req.user
      req.user = decoded.user; 
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized or missing token');
  }
});

module.exports = validateTokenHandler;