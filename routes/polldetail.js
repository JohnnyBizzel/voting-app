/*
var express = require('express');
var router = express.Router();
var PollsCtlr = require('../controllers/PollsController');
// var controllers = require("../controllers");

router.get("/polldetail/", function(req, res, next){
    console.log('inside Polldetail js - controller route');
    var resourceFrom = req.params.resource;
    // var controller = controllers[resourceFrom];
    var controller = PollsCtlr;
    
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

router.get("/polldetail/:id", function(req, res, next){
   //  var resource = req.params.resource;

    var id = req.params.id;
    //var controller = controllers[resource];
    var controller = PollsCtlr;
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
    // var resource = req.params.resource;

    //var controller = controllers[resource];
    var controller = PollsCtlr;
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: PollsCtlr '
        });
        return;
    }
    
    controller.create(req.body, function(err, result) {
         if (err){
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});

module.exports = router;

*/