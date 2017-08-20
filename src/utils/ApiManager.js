import superagent from 'superagent';

// This sends HTTP requests to the api route (see api.js)
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
    put: (url,body,callback) => {  // Api.put('/api/polls/' + pollId, newVotesObj, (err, response) => {
		console.log("apimanager value of body.operation:",body)
    	superagent
            .put(url)
            .set('Accept', 'application/json')
            .send(body)
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