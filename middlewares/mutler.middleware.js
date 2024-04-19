import multer from 'multer'

export const mutlerPhotoUpload = (req, res, next) => {
  const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 1000000 },
  }).single('photo')
  upload(req, res, function (err) {
    if (err) {
      console.log(err)
      return res.status(200).send({
        success: false,
        message: 'Error uploading the photo please check the size',
      })
    }
    next()
  })
}
