


const jwt =require('jsonwebtoken');

const verifyToken = (req,res,next)=>
  {
    const token = req.header('x-auth');
    if(!token)
      {
        return res.status(401).json({message:'No token,Authorization denied'});

      }
      try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.vendor = decoded.vendor;
        next();
      }
      catch(e)
      {
        res.status(401).json({error:'Token is not valid'});
      }
  };
  module.exports ={verifyToken};