const express = require('express');
const router = express.Router();

let User = require('../models/users');
router.get('/signup', function(req, res){
    
    res.render('signup')
});

router.post('/signup', function(req, res){
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    
    user.save(function(err){
        
        if(err) {
            console.log(err);
            return;
        } else {
            //res.redirect('/login');
          
            req.flash('success', 'Sucessfully created account')
            res.render('login')

        }
    });
});

router.get('/login', function(req, res){
    res.render('login')
});

router.get('/logout', function(req, res){
    req.session.destroy(function(err){
        console.log(err)
        res.redirect('/user/login')
    });
});

router.post('/login', async function(req, res){
    let query = {username: req.body.username, password: req.body.password};

    User.findOne(query, function(err, user){
        if(user) {
            req.session.username = user.username;
            res.redirect('/');
        }
        else {
            req.flash('danger', 'Invalid Login')
            res.render('login');
        }
    })
});


module.exports = router;