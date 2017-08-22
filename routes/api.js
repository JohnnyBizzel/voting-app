var express = require('express');
var router = express.Router();
var PollsCtlr = require('../controllers/PollsController');
var controllers = require("../controllers");

// This will route requests to the correct controller with params
// (only one in our project)  which is PollsController
console.log("Passing through request via [api.js] ...");

router.get("/:resource", function(req, res, next){
    var resourceFrom = req.params.resource;
    var controller = controllers[resourceFrom];
        console.log('inside API js - controller route...',controllers[resourceFrom]);

    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.find(req.query, function(err, results){
        if (err){
                res.json({ confirmation: 'fail',
                    message: err
                });
                return;
            }
            res.json({ confirmation: 'success',
                    message: results
        });
    });

  
});

router.get("/:resource/:id", function(req, res, next){
    var resource = req.params.resource;

    var id = req.params.id;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.findById(id, function(err, result){
           if (err){
                res.json({ confirmation: 'fail',
                    message: 'Not found'
                });
                return;
            }
            
            res.json({ confirmation: 'success',
                    message: result
                });
            
    });
    
});

router.post("/:resource", function(req, res, next){
    var resource = req.params.resource;
   
    var controller = controllers[resource];
    console.log("inside api post",req.body)
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    controller.create(req.body, function(err, result) {
        
         if (err){
             console.log(err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log(result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});

router.put("/:resource/:id", function(req, res, next){
     
    var resource = req.params.resource;
    console.log(' expecting polls ', resource);
    var id = req.params.id;
    var controller = controllers[resource]; // select a controller specified in the URL
    console.log('inside API js - controller route for ', controller);
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }

    controller.update(id, req.body, function(err, result) { // call update function of specified ctlr

        if (err){
            res.json({ confirmation: 'fail',
                message: 'This is the fail from api.js: ' + err
            });
            return;
        }
        
        res.json({ confirmation: 'success',
                message: 'This is the ****SUCCESS**** from api.js' + JSON.stringify(result)
            });
        
    });  


});

router.delete("/:resource/:id", function(req, res, next){
    var resource = req.params.resource;

    var id = req.params.id;
    console.log("in api.js file",resource,id)
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.delete(id, function(err, result){
           if (err){
                res.json({ confirmation: 'fail',
                    message: 'Not found'
                });
                return;
            }
            
            res.json({ confirmation: 'success.The poll got deleted',
                    message: result
                });
            
    });
    
});

module.exports = router;