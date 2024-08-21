const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }) // Ensure MONGO_URI is set in your .env file
    //unaeza ongeza max age ya cookie or time to live
  }));


  // Middleware to make the session available to templates
app.use((req, res, next) => {
    res.locals.user = req.session.userId ? req.session.userId : null;
    next();
  });

  // middleware folder auth.js
  const protect = (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  
  module.exports = protect;
  

//protect
  app.get('/order', protect, (req, res) => res.render('order'));