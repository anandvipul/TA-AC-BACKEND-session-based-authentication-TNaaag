let mongoose = require("mongoose");
let bcrypt = require("bcrypt");


let Schema = mongoose.Schema;

let user = new Schema({
    "name": {type: String},
    "age": {type: Number},
    "email": {type: String},
    "password": {type: String},
    "phone": {type: Number}
}, {timestamps: true});


user.pre("save", function (next) {
    if (this.password && this.isModified("password")) {
        bcrypt.hash(this.password, 10, (err, hashed) => {
            console.log(hashed);
            this.password = hashed;
            next();
            
        });
    } else {
        next();
    }
    
});


user.methods.verifyPassword = function (password, callBack) {
    bcrypt.compare(password, this.password, (err, result) => {
        return callBack(err, result);
    });
}
module.exports = mongoose.model("User", user);