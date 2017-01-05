var Polls = require("../models/Polls");

// CRUD operations
// pre-processing goes here for example setting up an array
// from the data inputted.
module.exports = {
    
    find: function(params, callback){
        console.log("PollsControler : find function")
        Polls.find(params, function(err, poll){
            if (err) {
                callback(err, null);
                return;
            }
            callback(err, poll);
        });
    },
    findById:function(id, callback){
        console.log("PollsControler : find by ID function")
        Polls.findById(id, function(err, poll){
            if (err) {
                callback(err, null);
                return;
            }
            callback(err, poll);
        });
    },
    create:function(params, callback){
        console.log("PollsControler : create function")
        // split up an array of poll responses
        
        var responses = params['responses'];
        var responseAry = responses.split(';');
        var newAry = [];
        responseAry.forEach(function(resp){
            var respObj = { "response": resp.trim(), 
                            "votes" : 0 }
           newAry.push(respObj); 
        });
        params['responses'] = newAry;
        
        
        // var pollquestion = params['pollquestion'];
        
        
        //console.log(params);
        
        
        Polls.create(params, function(err, poll) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, poll);
        });      
    },
    update:function(id,params, callback){
        console.log("PollsControler : update function")
        Polls.findByIdAndUpdate(id, params,{new:true}, function(err, poll){
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, poll);

        });
        
    },

    delete:function(id, callback){
        Polls.findByIdAndRemove(id, function(err){
             if (err) {
                callback(err, null);
                return;
            }
            callback(null, null);
        });
    }
};