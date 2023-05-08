const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');


mongoose.connect('mongodb://localhost/meddata');
let db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
});

db.once('open', function(){
    console.log("Connected to mongodb");
})

const app = express();

let Medicine = require('./models/medicine');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

 

  app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(function(req, res, next){
    if (req.path !== '/user/login' && !req.session.username) {
        return res.redirect('/user/login');
    }
    next();
});

app.get('/', function(req, res){
    Medicine.find({}, function(err, medicines){
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', {
                title: 'MEDICINES ',
                medicines: medicines
            });
        } 
    });
});


//Route files

let medicines = require('./router/medicines');
app.use('/medicines', medicines);

let users = require('./router/user');

app.use('/user', users);

app.listen(3000, function(){
    console.log('Server started on port 3000...');
})