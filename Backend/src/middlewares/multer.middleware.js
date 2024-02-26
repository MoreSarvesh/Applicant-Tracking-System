const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./resumes");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name + Date.now().toString() + ".pdf");
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
