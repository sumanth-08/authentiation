const User = require("../models/user")
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const authenticate = require("./authentication.js");


exports.signup = (req, res) => {

    const user = new User(req.body)
        user.save((err, users) =>{
            if(err) {
                return res.status(400).send(err.message)
             
            }
                return res.json({
                    message: "success",
                    users
            })
        })          
    }

    exports.signin = (req, res) => {
        const {email, password} = req.body

        User.findOne({email}, (err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: "email was not found"
                })
            }

            if(!user.authenticate(password)){
                return res.status(400).json({
                    error: "email and password does not match"
                })
            }

            const token = jwt.sign({_id: user._id}, process.env.SECRET)

            res.cookie('token', token, {expire: new Date() + 1})

            const {_id, name, email} = user
            return res.json({
                token,
                user:{
                    _id,
                    name,
                    email
                }
            })
        }) 
    }

    exports.signout = (req, res) => {
        res.clearCookie("token")
        return res.json({
            message: "Logout successful"
        })

    }
    
   exports.list = (authenticate,  async (req, res) => {
        try {
          const receive = await User.find();
          res.json(receive);
        } catch (err) {
          res.send(err);
        }
      });
      
      // POST
    exports.add = (async (req, res) => {
      
        const send = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone: req.body.phone,
          email: req.body.email,
          
        });
      
        try {
          const a1 = await send.save();
          res.json(a1);
        } catch (err) {
          res.send(err.message);
        }
      });

