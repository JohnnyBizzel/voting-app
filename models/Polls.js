var mongoose = require('mongoose');

// var mongooseTypes = require("mongoose-types"); // use to check for a url datatype
// mongooseTypes.loadTypes(mongoose);



//Create a schema
var PollsSchema = new mongoose.Schema({
  pollquestion:{type:String,default:''},
  author:{type:String,default:'unknown'},
  responses:{type:Array,default:[
                                  {respID: Number,
                                  response: String, 
                                  votes: Number}
                                ]},
  timestamp: {type:Date, default:Date.now()}
});

// maybe something like this we can connect to the polls
/*var VoteSchema = new mongoose.Schema({
  voteon:{type:String,default:''}, // the id of the poll
  voter:{type:String,default:''}, // the user who voted
  ipaddress:{type:String,default:''}, // their ip address ???
  timestamp: {type:Date, default:Date.now()} // when they voted
});
*/
module.exports = mongoose.model('PollsSchema', PollsSchema);