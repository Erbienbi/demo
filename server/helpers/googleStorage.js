const unggah = require("unggah");

const storage = unggah.gcs({
  keyFilename: "./sylvan-replica-269914-0824639fe06d.json",
  bucketName: "erbienbi",
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`;
  },
});

const upload = unggah({
  limits: {
    fileSize: 1e15
  },
  storage: storage
});

module.exports = upload