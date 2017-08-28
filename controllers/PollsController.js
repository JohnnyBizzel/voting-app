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
    update:function(id, param,  callback){
        // update one response using it's Response ID and data
        var returnNewUpdatedDoc = {new:true};
        var respID = param['respID'];
        var respVal = param['response'];
        var voteVal = param['votes'];
        console.log("Setting ID Value: ",respID)
        console.log("Setting Param Values: ",respVal)
        console.log("Setting Vote Values: ",voteVal || 0)
        // Check if deleting an option or renaming an option
        switch (param['operation']) {
            case '[DELETE]':
                Polls.findOne({ _id: id}, function (err, doc) {
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        // console.log('-- responses -',doc.responses);  
                        var idx = doc.responses ? doc.responses.findIndex((x) => x.respID === respID) : -1;
                        // is it valid?
                        // console.log('idx to delete', idx);
                        if (idx !== -1) {
                            // remove it from the array.
                            doc.responses.splice(idx, 1);
                            // save the doc
                            doc.save(function(error) {
                                if (error) {
                                    console.log(error);
                                    callback(error, null);
                                } else {
                                    // send the records
                                    // console.log('updated', doc);
                                    callback(err, doc);
                                }
                            });
                            // stop here, otherwise 404
                            return;
                        }
                        
                    }
                });
                break;
            case '[UPDATE]':
                // This handles when a user submits a vote 
                Polls.where({ _id: id}).where({'responses.respID': respID } )
                    .update({ $set: { 'responses.$.votes': voteVal, 
                        'responses.$.response': respVal 
                    }}, function(err, poll){
                        if (err) {
                            callback(err, null);
                            return;
                        }
                        else{
                            // console.log("Updating poll, got something",poll)
                            callback(err, poll);
                        }
                });
                break;
            case '[ADD]':
                const newObj = { 'respID': respID,
                                'response': respVal,
                                'votes' : 0 }
                Polls.findOne({ _id: id}, function (err, doc) {
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        //console.log('--add new response to --', doc);  

                        doc.responses.push(newObj);
                        // save the doc
                        doc.save(function(error) {
                            if (error) {
                                console.log(error);
                                callback(error, null);
                            } else {
                                // send the records
                                callback(err, doc);
                            }
                        });
                        // stop here, otherwise 404
                        return;
                    }
                });
            
                break;
        }
       

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