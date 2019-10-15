
var router = global.router;
var Food = require('../models/FoodModel');
var User = require('../models/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/insert_new_user',function(req,res,next){
  var useR = new User({
    username: req.body.username,
    pwd: req.body.pwd,
  });
  useR.save((err)=>{
    if(err){
      res.json({
        status: `fail is ${err}`,
      })
    }else{
      res.json({
        status: "ok",
        username: req.body.username,
        pwd: req.body.pwd,
      })
    }
  });
});
router.get('/get_all_user',(req,res,next)=>{
  User.find({}).limit(100).select({
    _id: 1,
    username: 1,
    pwd: 1,
  }).exec((err,users)=>{
    if(err){
      res.json({
        status: "fail",
        data: {},
        messege: `${err}`,
      });
    }else{
      res.json({
        status: "ok",
        data: users,
        messege: `${err}`,
      });
    }
  })
});
router.get('/login_user',(req,res,next)=>{
  var condition = {
    username: req.query.username,
    pwd: req.query.pwd,
  };
  User.find(condition).limit(1).select({
    _id: 1,
    username: 1,
    pwd: 1,
    
    level: 1,
  }).exec((err,user)=>{
    if(err){
      res.json({
        status: "fail",
        data: {},
        messege: "login error",
      });
    }else{
      var num = user.length;
      if(user.length>0){
        res.json({
          status: "ok",
          data: user,
          messege: "login successfull",
        })
      }else{
        res.json({
          status: "fail",
          data: {},
          messege: "login Faill",
        });
      }
    }
  });
});
module.exports = router;
