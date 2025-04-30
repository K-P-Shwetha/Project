const express = require('express');
const router=express.Router();
const bcrypt = require('bcrypt'); 
const User= require('/home/venkatesh/Documents/project/money/backend/models/user');
const registerValidation = require("../validation/user");

router.post('/register', async (req, res,next) => {
  try{
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, password, email } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Save to DB
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully ✅' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong ❌' });
    }
  }
);



module.exports=router;