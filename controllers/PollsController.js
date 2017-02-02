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
        // split up an array of poll responses
        
        var responses = params['responses'];
        var responseAry = responses.split(';');
        var newAry = [];
        responseAry.forEach(function(resp, index){
            var respObj = { "response": resp.trim(), 
                            "votes" : 0,
                            "respID": index+1}
           newAry.push(respObj); 
        });   
        params['responses'] = newAry;
        
        
        Polls.create(params, function(err, poll) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, poll);
        });      
    },
    //this is great,awesome
    update:function(id, param,  callback){
        
        var returnNewUpdatedDoc = {new:true};
        var respID = param['respID'];
        var respVal = param['response'];
        var voteVal = param['votes'];
        console.log("Setting Param Values: ",respVal)
        console.log("Setting Vote Values: ",voteVal)
        Polls.where({ _id: id}).where({'responses.respID': respID } )
                .update({ $set: { 'responses.$.votes': voteVal, 
                    'responses.$.response': respVal 
                }}, function(err, poll){
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    else{
                        console.log("got something",poll)
                        callback(err, poll);
                    }
                    

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