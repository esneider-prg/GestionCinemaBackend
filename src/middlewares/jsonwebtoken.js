const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../constants')
const asyncHandler = require("express-async-handler");
const UserCinema = require("../models/Account")

const signToken = (payload = {}, expiresIn = '12h') => {
  const token = jwt.sign(payload, JWT_SECRET, {expiresIn})

  return token
}

const authorizeBearerToken = (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) {
      return response.status(400).json({
        message: 'Token not provided',
      })
    }

    const auth = jwt.verify(token, JWT_SECRET)
    if (!auth) {
      return response.status(401).json({
        message: 'Unauthorized - invalid token',
      })
    }

    request.auth = auth
    
    next()
  } catch (error) {
    console.error(error)
    return response.status(401).json({
      message: 'Unauthorized - invalid token',
    })
  }
}

// protection middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from Bearer token in header
    try {
      token = req.headers.authorization.split(" ")[1];
      // verify token and get user id
      const decoded = jwt.verify(token, JWT_SECRET);
      // get user id from decoded token
      
      req.user = await UserCinema.findById(decoded.uid).select("-password");
      next();
      
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  // if token doesn't exist in headers send error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});



const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = {
  authorizeBearerToken,
  signToken,
  admin,
  protect
}

