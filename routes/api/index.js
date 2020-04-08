var express = require('express');
var router = express.Router();

const testRouter =require('./test')
var usersRouter = require('./users');
var articlesRouter = require('./articles')
var profileRouter = require('./profiles')

var auth =require('../../modules/auth')
var User = require('../../models/User')
var Article = require('../../models/Article')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// getting current user
router.get("/user", auth.verifyToken, async(req, res, next)=>{
  try {
   await (User.findOne({email:req.user.email}).populate("articlesCreated")
   .exec((err, data)=>{
     if(err) return next(err)
     res.send(data)
   }))

  //  res.json(currentUser)
  // } catch (error) {
  //     console.log("current user ",error)
  }catch(err){
    console.log(err)
  }
})
//Show favourited articles 
router.get("/user/:username/favourited", async(req, res, next)=>{
  try {
   await (User.findOne({email:req.params.username}).populate("favouriteArticles")
   .exec((err, data)=>{
     if(err) return next(err)
     console.log("abracadabre",data)
     res.send(data)
   }))

  }catch(err){
    console.log(err)
  }
})

// updating a user 
router.put('/user',auth.verifyToken, async(req, res)=>{
  try {
      var toFind = req.user.email;
      var foundUser = await User.findOne({email:toFind})
      if(req.body.password){
        foundUser.password = req.body.password
      }
      foundUser.username = req.body.username
      await foundUser.save()
      res.json(foundUser)
      console.log(foundUser)
  } catch (error) {
      console.log('updated user err',error)
  }
})  

// get tags
router.get('/tags',  (req, res, next)=>{
  var tagArray = []
  Article.find()
  .exec((err,data)=>{
    if(err) return next(err);
      data.forEach(element=>{
        tagArray = tagArray.concat(element.taglist)
      })
      res.send([... new Set(tagArray)])
    })
})
  
  // try {
  //   allArray = await Article.find({})
  //   var tagArray = [];
  //   var newArrray = allArray.map(element => {
  //   tagArray.concat(element.taglist)
    
  // });
  // res.json(newArrray)
  // } catch (error) {
  //   console.log("dsdsadasdsa",error)
  // }
    // allArray = await Article.find()
    // // console.log(allArray,"allArticle")
    // var tagArray = [];
    // var newArray = allArray.map(ele=>{
    //   tagArray.push(ele.taglist)
    // })
    // console.log(newArray)
// })


router.use('/users', usersRouter);
router.use('/articles',articlesRouter);
router.use('/profiles',profileRouter);
router.use('/test',testRouter)


module.exports = router;
