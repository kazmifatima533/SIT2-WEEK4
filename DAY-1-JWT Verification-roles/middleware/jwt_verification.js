const jwt = require('jsonwebtoken');
const requireSignin=(req, res, next) => {
//  const token =req.headers
//                 .authorization.split(' ')[1];
const token = req.header('Authorization');
console.log("token",token)
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, process.env.JWT_URI);
 req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };
 const isAdmin=(req, res, next) => {
//  const token =req.headers
//                 .authorization.split(' ')[1];
const token = req.header('Authorization');
console.log("token",token)
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, process.env.JWT_URI);
 console.log("decode",decoded)
 if(decoded.role!=1){
   return res.status(401).json({ error: 'You do not have access to update user admin can do it only'})
 }
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = {requireSignin,isAdmin};