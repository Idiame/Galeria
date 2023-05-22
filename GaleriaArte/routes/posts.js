const {Router} = require("express")
const router = Router()
const path = require('path');

const multer = require('multer');
// const sizeOf = require('image-size');
// const { v4: uuid } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads')
  },
  filename: (req, file, cb) =>{
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})


router.get('/',(req, res, next)=> {
  res.render('posts');
});

router.post('/uplaod', upload.single('image') , (req, res, next) => {
  res.send('Image Uploaded')
})
module.exports = router;
  
