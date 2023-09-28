import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_secret, {
    expiresIn: '30d',
  });

  res.cookie('jwt',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', 
    //we dont use https in development mode
    sameSite: 'strict',
    maxAge : 30 * 24 * 60 * 60 * 1000
  })
};

export default generateToken;