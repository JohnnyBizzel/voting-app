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
    update:function(id, param,  callback,editPoll){
        console.log("this is params",param)
        editPoll  = param.editpoll || false;  
        if(editPoll===true){
            console.log("editpoll is true")
            console.log("param editpoll",param.editpoll)
            console.log("response value",param["response"])
            console.log("poll value",param["poll"])
            console.log("poll is this",param.poll)
            console.log("this is param",param)
            
            //johnny put code here ,,
             Polls.where({ _id: id}).update(param, function(err, poll){
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    else{
                        console.log("got something",poll)
                        callback(err, poll);
                    }
                    

        });
            
        }
        else{
            console.log("editpoll is false")
            
            //new circus begins 18 jan , 6 pm, setting editpolfalse code
             var returnNewUpdatedDoc = {new:true};
        var respVal = param['response'];
        var voteVal = param['votes'];
        console.log("Setting Param Values: ",respVal)
        console.log("Setting Vote Values: ",voteVal)
        Polls.where({ _id: id}).where({'responses.response': respVal } )
                .update({ $set: { 'responses.$.votes': voteVal, 
                    'responses.$.response': respVal, 
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
            
            
        }
        
        /*
        var returnNewUpdatedDoc = {new:true};
        var respVal = param['response'];
        var voteVal = param['votes'];
        console.log("Setting Param Values: ",respVal)
        console.log("Setting Vote Values: ",voteVal)
        Polls.where({ _id: id}).where({'responses.response': respVal } )
                .update({ $set: { 'responses.$.votes': voteVal, 
                    'responses.$.response': respVal, 
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
        
      */
        
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