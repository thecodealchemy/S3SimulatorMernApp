const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const File = require("../models/File");
const { v4: uuidv4 } = require("uuid");
const s3 = require("../Config/s3");

const bucket = process.env.AWS_S3_BUCKET;

exports.uploadFile = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file provided" });

  const key = `${uuidv4()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  const fileUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  const saved = await File.create({
    filename: file.originalname,
    fileUrl,
    mimetype: file.mimetype,
    size: file.size,
  });

  res.status(201).json(saved);
};

exports.getFiles = async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });
  res.json(files);
};

exports.downloadFile = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ error: "File not found" });

  const key = file.fileUrl.split("/").pop();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  res.json({ downloadUrl: signedUrl });
};