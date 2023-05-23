
const { Router } = require("express");
const router = Router();
const path = require('path');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = path.resolve(__dirname, 'uploads');
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.get('/', (req, res, next) => {
  const imagesDir = path.join(__dirname, 'uploads');

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio de imágenes:', err);
      return res.status(500).send('Error al leer el directorio de imágenes');
    }

    const imageFiles = files.filter(file => {
      const extname = path.extname(file).toLowerCase();
      return extname === '.jpg' || extname === '.jpeg' || extname === '.png' || extname === '.gif';
    });

    imageFiles.forEach(image => {
      const imagePath = path.join(imagesDir, image);
      console.log('Ruta de la imagen:', imagePath);
    });

    res.render('upload', { images: imageFiles });
  });
});



router.post('/', upload.single('image'), (req, res, next) => {
  res.redirect('/upload');
});

module.exports = router;

