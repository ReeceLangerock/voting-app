  //setup =================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var port= process.env.PORT || 3000;

//configuration ========================
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds019936.mlab.com:19936/voting-app-srl`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection eror:'));
db.once('open', function(){
  console.log("connected");
})

//express setup ========================

app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(function(err, req, res, next){
    res.sendStatus(404);
    res.render('404');
    return;
});

//passport setup ======================
app.use(session({secret: '123ABC'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
 next();
});

// routes =========================
app.use('/signin', require('./controllers/signin'));
app.use('/create-poll', require('./controllers/create-poll'));
app.use('/view-polls', require('./controllers/viewPolls'));
app.use('/poll', require('./controllers/poll'));
app.use('/logout', require('./controllers/logout'));
app.use('/', require('./controllers/index'));
app.use(function (req, res, next) {
  res.status(404).render('404');
})

// launch ==========================
app.listen(port, function(){
  console.log(`Voting App listening on port ${port}!`)
});
