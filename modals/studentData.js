const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
// Name, roll no., Email, contact no
const studentSchema = new Schema({
    name : {type:String , required:true},
    rollNo : {type:String,required:true},
    email : {type:String,required:true},
    contactNo : {type:String , required:true},
    id : {type:String , required:true}
});
const studentModal = mongoose.model('student',studentSchema);
module.exports  = studentModal;