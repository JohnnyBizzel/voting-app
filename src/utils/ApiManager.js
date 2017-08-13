import superagent from 'superagent';

export default {
    get: (url, params, callback) => {
        superagent
			.get(url)
			.query(params)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) { 
				    callback(err, null);
				    return;}
				// here check for API failures
				const confirmation = response.body.confirmation;
				if (confirmation != 'success') {
				    // send a failure message
				    callback({message:response.body.message, null});
				    return;
				}
				callback(null, response.body);
			});
    },
    post: (url, body, callback) => {
        superagent
            .post(url)
            .send(body)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) { 
                	console.log(err);
				    callback(err, null);
				    return;}
				// here check for API failures
				const confirmation = response.body.confirmation;
				if (confirmation != 'success') {
				    // send a failure message
				    callback({message:response.body.message, null});
				    return;
				}
				callback(response, response.body);
            })
        
    },
    put: (url,body,callback,editpoll) => {  // Api.put('/api/polls/' + pollId, newVotesObj, (err, response) => {
		console.log("apimanager value of editpoll",editpoll)
    	superagent
            .put(url)
            .set('Accept', 'application/json')
            .send(body)
            .send({editpoll:editpoll})
            .end((err, response) => {
                if (err) { 
                	console.log('SuperAgent PUT error= ' + err);
                	
				    callback(err, null);
				    return;}
				// here check for API failures
				const confirmation = response.body.confirmation;
				if (confirmation != 'success') {
				    // send a failure message
				    console.log('SuperAgent PUT failed');
				    callback({message:response.body.message, null});
				    return;
				}
				console.log('SuperAgent worked!');
				callback(null, response.body);
            })
        // check console log and this get's called:
        // It does not reach the .end callback
        console.log('SuperAgent... what happened?');
    },
    del: (url,params,callback) => {
    	superagent
            .del(url)
            .send(params)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) { 
                	console.log(err);
				    callback(err, null);
				    return;}
				// here check for API failures
				const confirmation = response.body.confirmation;
				if (confirmation != 'success') {
				    // send a failure message
				    callback({message:response.body.message, null});
				    return;
				}
				callback(null,null);
            })
        
    }
}