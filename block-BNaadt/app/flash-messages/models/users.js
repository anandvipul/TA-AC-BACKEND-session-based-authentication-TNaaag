let mongoose = require("mongoose");
let bcrypt = require("bcrypt");


let Schema = mongoose.Schema;

let user = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {timestamps: true});

user.pre("save", function (next) {
    if (this.password && this.isModified("password")) {
        bcrypt.hash(this.password, 10, (err, hashed) => {
            this.password = hashed;
            console.log(hashed);
            next();
        });
    } else {
        next();
    }
});

user.methods.verifyPassword = function (password, callBack) {
    bcrypt.compare(password, this.password, (err, message) => {
        return callBack(err, message);
    })
};

module.exports = mongoose.model("User", user);