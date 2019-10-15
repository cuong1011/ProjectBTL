var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DatBanSchema = new Schema({
    id_food: Schema.ObjectId,
    id_table: Schema.ObjectId,
});
module.exports = mongoose.model('datban',DatBanSchema);