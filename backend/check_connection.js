//check connection
app.use(function(req, res, next){
  require('dns').resolve('www.google.com', function(err) {
    if (err ) {
      console.log('ERROR Connection')
      res.json({status:false, message:'Connection error'})
    } else {
      console.log("Connected");
      next();
    }
  });
})
