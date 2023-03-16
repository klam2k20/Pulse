const { Storage } = require("@google-cloud/storage");

const gcs = new Storage({
  projectId: "pulse-380803",
  keyFilename: `${__dirname}/../pulse-gcs.json`,
});

const bucket = gcs.bucket("pulse_photo_bucket");

const uploadPhoto = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No File Uploaded" });
  const { originalname, buffer } = req.file;

  /** Create a binary file inside GCS bucket */
  const blob = bucket.file(`${req.user._id}-${originalname}-${Date.now()}`);

  /** Create a write stream. Resumable should be set to false for uploads less than 5MB */
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  /** Once write stream is done return the public url */
  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res.status(200).send(publicUrl);
  });

  /** Before closing the stream write the buffer */
  blobStream.end(buffer);
};

module.exports = { uploadPhoto };
