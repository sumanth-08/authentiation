const mongoose = require('mongoose')
const crypto = require("crypto");
const uuidv1 = require("uuidv1");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true

    },
    last_name:{
        type: String,
        maxlength: 32,
        trim: true
    },

    email: {
        type: String, 
        trim: true,
        required: true,
        unique: true
    },

    encry_password: {
      type:String,
      required: true  
    },
    salt: String,

    first_name: {
        type: String,
        required: ["First name is required"],
        // unique: true,
      },
      last_name: {
        type: String,
        required: ["last name is required"],
      },
      phone: {
        type: Number,
        required: ["Phone number is required"],
        unique: true,
        validate: {
          validator: (val) => {
            return val.toString().length >= 10 && val.toString().length <= 12;
          },
        },
      },
    
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: ["email address is reqiured"],
        validate: (email) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        },
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
    
}, {timestamps: true})

userSchema.virtual("password")
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password
  },

  securePassword: function(plainpassword) {
    if(!plainpassword) return "";

    try {
      return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
    } catch (err) {
      return ""
    }
  }

}

module.exports = mongoose.model("User", userSchema)