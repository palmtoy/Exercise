#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
const host = 'http://localhost';
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer Configuration
const storageObj = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const tmpList = file.originalname.split('.');
    cb(null, `${tmpList[0]}-${Date.now()}.${tmpList[1]}`);
  },
});
const uploadObj = multer({
  storage: storageObj,
  limits: {
    fileSize: 1024 * 1024 * 25, // Max file size 25MB
  },
});

// File Upload Endpoint
app.post('/upload-files', uploadObj.array('files'), (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.files =', req.files);
  const urlList = [];
  req.files.forEach(fileObj => {
    urlList.push(`${host}:${port}/uploads/${fileObj.filename}`);
  });
  return res.status(200).json({
    message: 'File uploaded OK',
    data: {
      urls: urlList.join(', '),
    },
  });
});

app.get('/uploads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: 'File not found',
    });
  }
  return res.sendFile(filePath);
});

app.get('*', (req, res) => {
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
