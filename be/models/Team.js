const mongoos = require("mongoose");
const { Schema } = mongoos;

const teamSchema = new Schema({
});

module.exports = mongoos.model("Team", teamSchema);