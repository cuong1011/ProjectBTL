var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TableSchema = new Schema({
    nameTable:{
        type: String,
        default: "aa",
    }
});
module.exports = mongoose.model('table',TableSchema);