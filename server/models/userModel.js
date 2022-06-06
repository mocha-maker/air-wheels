const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    name: {
      type: String,
      min: [4, "Too short, minimum 4 characters."],
      max: [155, "Too long, maximum 155 characters"],
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/],
    },
    password: {
      type: String,
      min: [6, "Too short, minimum 6 characters."],
      max: [55, "Too long, maximum 55 characters"],
      required: [true, "Please add a password"],
    },
    // Roles
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Rentals
    rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.isSamePassword = function (requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

// Hash password with bcrypt on save
userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const user = this;

    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          console.log("User saving: " + user);
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model('User', userSchema)