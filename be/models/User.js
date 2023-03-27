const mongoos = require("mongoose");
const { Schema } = mongoos;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    department:String,
    studentId:String,
    name:String,
    teamID:[Number],
    isProf:Boolean
},
{
    timestamps: true
});

module.exports = mongoos.model("User", userSchema);

