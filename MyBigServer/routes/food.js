var router = global.router;
var mongoose = require('mongoose');
var Food = require('../models/FoodModel');
router.get('/get_all_foods',function(req,res,next){
    Food.find({}).limit(100).sort({name:1}).select({
        _id: 1,
        name: 1,
        price: 1,
    }).exec((err,food)=>{
        if(err){
            res.json({
                status: "fail",
                data: {},
                messege: `fail is: ${err}`,
            })
        }else{
            res.json({
                status: "ok",
                data: food,
                messege: `Successs`,
            })
        }
    });
});
router.post('/upload_img',(req,res,next)=>{
    let formidable = require('formidable');
    var form = new formidable.IncomingForm();
    form.uploadDir = "./upload";
    form.keepExtensions = true;
    form.maxFields = 10*1024*1024;
    form.multiples = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.json({
                status: "fail",
                messege: `error is ${err}`,
            });
        }
            var arrayOfFiles = [];
            if(files[""] instanceof Array){
                arrayOfFiles = files[""];
            }else{
                arrayOfFiles.push(files[""]);
            }
            if(arrayOfFiles.length > 0){
                var fileName = [];
            //    arrayOfFiles.forEach((eachfile)=>{
            //         fileName.push(eachfile.file.path)
            //        });
               res.json({
                   status: "ok",
                   data: files.file.path,
                   messege: "you have uploaded image",
               })
            }else{
                res.json({
                    status: "faill",
                    messege: "khong co anh nao",
                })
            }
    });
    form.onPart(part);
});
router.delete('/delete_food',(req,res,next)=>{
    var condition ={
        _id: mongoose.Types.ObjectId(req.body.id),
    };
    Food.findByIdAndDelete({_id: mongoose.Types.ObjectId(req.body.id)},(err)=>{
        if(err){
            res.json({
                status: "fail",
                messege: "loi khong the xoa",
            });
        }else{
            res.json({
                status: "ok",
                messege: "da xoa thanh cong",
            });
        }
    });
});
router.put('/update_a_food',(req,res,next)=>{
    let condition = {};
    if(mongoose.Types.ObjectId.isValid(req.body.id) == true){
        condition.id = mongoose.Types.ObjectId(req.body.id);
        var newValue = {};
    newValue.name = req.body.name;
    newValue.price =  req.body.price;
    var options = {
        new: true,
        multi: true,
    }
    if(mongoose.Types.ObjectId.isValid(req.body.cate_id) == true){
        newValue.cate_id =  mongoose.Types.ObjectId(req.body.cate_id);
    }
    Food.findByIdAndUpdate(condition.id, {$set: newValue},options,(err,updatedFood)=>{
        if(err){
            res.json({
                status: "fail",
                messege: `err is ${err}`,
            });
        }else{
            res.json({
                status: "ok",
                data: updatedFood,
                messege: "update successfull",
            })
        }
    });
    }else{
        res.json({
            status: "fail",
            messege: "Ban phai nhap vao id",
        })
    }
});
router.post('/insert_new_food',function(req,res,next){
    var condition = {
        name: RegExp('^'+req.body.name.trim()+'$',"i"),
    };
    Food.find(condition).limit(1).exec((err,foods)=>{
        if(err){    
            res.json({
                status: "fail",
                messege: "Fail",
            });
        }else{
            var num = foods.length;
            if(num>0){
                res.json({
                    status: "exist",
                    messege: "Da ton tai ban ghi",
                });
            }else{
                var fooD = new Food({
                    name: req.body.name,
                    price: req.body.price,
                  });
                  fooD.save((err)=>{
                    if(err){
                      res.json({
                        status: `fail is ${err}`,
                      })
                    }else{
                      res.json({
                        status: "ok",
                        name: req.body.name,
                        price: req.body.price
                      })
                    }
                  });
            }
        }
    });
  });
  router.get('/get_food_by_cate',(req,res,next)=>{
    var condition = {
        cate_id: mongoose.Types.ObjectId(req.body.cate_id),
    };
    Food.find(condition).limit(100).select({
        name: 1,
        price: 1,
    }).exec((err,food)=>{
        if(err){
            res.json({
                status: "fail",
                data: {},
            });
        }else{
            res.json({
                status: "ok",
                data: food,
                messege: "get success full",
            });
        }
    });
  });
  router.get('/get_food_width_id',function(req,res,next){
    Food.findById(require('mongoose').Types.ObjectId(req.query.food_id),
        (err,food)=>{
            if(err){
                res.json({
                    result: "fail",
                    data: {},
                    messege: `error is: ${err}`,
                });
            }else{
                res.json({
                    result: "OK",
                    data: food,
                    messege: `successfull`,
                });
            }
        });
  });
  router.put('/update_food',(req,res,next)=>{
    
  });
  router.get('/get_with_condition',(req,res,next)=>{
      const condition = {
          name: new RegExp(req.query.name, "i"),

      };
      const limit = 100;
    Food.find(condition).limit(limit).sort({name: 1}).select({
        name: 1,
        price: 1,
    }).exec((err,food)=>{
        if(err){
            res.json({
                status: "fail",
                data: [],
            });
        }else{
            res.json({
                status: "ok",
                data: food,
                count: food.length,
                messege: "success",
            });
        }
    })
  });
module.exports = router;