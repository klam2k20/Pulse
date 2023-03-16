const { Storage } = require("@google-cloud/storage");

const gcs = new Storage({
  projectId: "pulse-380803",
  keyFilename: `${__dirname}/../pulse-gcs.json`,
});

const bucket = gcs.bucket("pulse_photo_bucket");

const uploadPhoto = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No File Uploaded" });
  const { originalname, buffer } = req.file;

  /** Create file inside GCS bucket */
  const blob = bucket.file(originalname);

  /** Create a write stream */
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    console.log(publicUrl);
    res.status(200).send(publicUrl);
  });

  blobStream.end(buffer);
};

module.exports = { uploadPhoto };
