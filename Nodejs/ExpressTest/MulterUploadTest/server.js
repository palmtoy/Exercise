#!/usr/bin/env node

const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const tmpList = file.originalname.split('.');
    cb(null, `${tmpList[0]}-${Date.now()}.${tmpList[1]}`);
  },
});
const upload = multer({ storage });

// File Upload Endpoint
app.post('/upload-files', upload.array('files'), uploadFiles);
function uploadFiles(req, res) {
  console.log('req.body =', req.body);
  console.log('req.files =', req.files);
  res.json({ message: 'Files uploaded OK' });
}

app.get('*', function (req, res) {
  let fileName = '/index.html';
  if (req.originalUrl.length > '/'.length) {
    fileName = req.originalUrl;
  }
  const filePath = path.join(__dirname, `views/${fileName}`);
  return res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server started, listening on port ${port} ...`);
});
