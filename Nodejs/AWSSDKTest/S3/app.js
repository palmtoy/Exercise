#!/usr/bin/env node

const fs = require('fs');
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'personal-account-long-term' });
// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

async function listBuckets() {
  return new Promise((resolve, reject) => {
    // Call S3 to list the buckets
    s3.listBuckets(function (e, data) {
      if (e) {
        console.error(`_listBuckets error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data.Buckets);
      }
    });
  });
}

async function listObjects(bucketName) {
  return new Promise((resolve, reject) => {
    // Create the parameters for calling listObjects
    const bucketParams = {
      Bucket: bucketName,
    };
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (e, data) {
      if (e) {
        console.error(`_listObjects error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
    });
  });
}

async function uploadFile(bucketName, filePath) {
  return new Promise((resolve, reject) => {
    // call S3 to retrieve upload file to specified bucket
    const uploadParams = { Bucket: bucketName, Key: '', Body: '' };
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (e) {
      console.error(`_uploadFile _fileStream error -- msg: "${e.message}"\n${e.stack}`);
      return reject(e);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = filePath;
    console.table({ Key: uploadParams.Key, Bucket: uploadParams.Bucket });

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (e, data) {
      if (e) {
        console.error(`_uploadFile _upload error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
    });
  });
}

function getSignedUrl(bucketName, filePath) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: filePath,
    Expires: 60 * 60 * 12, // signedUrlExpireSeconds
  });
}


(async () => {
  let bucketName = '';
  const s3Buckets = await listBuckets();
  console.log(`s3Buckets = ${JSON.stringify(s3Buckets)}`);
  if (s3Buckets && s3Buckets.length) {
    bucketName = s3Buckets[0].Name;
  }
  if (!bucketName) {
    return console.log('There is NO bucket.');
  }

  const s3objListA = await listObjects(bucketName);
  console.log(`s3objListA = ${JSON.stringify(s3objListA)}`);

  const filePath = 'ref-images/Napoleon.jpeg';
  const s3UploadRet = await uploadFile(bucketName, filePath);
  console.table(s3UploadRet);

  const s3objListB = await listObjects(bucketName);
  console.log(`s3objListB = ${JSON.stringify(s3objListB)}`);

  const s3presignedURL = getSignedUrl(bucketName, filePath);
  console.log(`s3presignedURL = ${s3presignedURL}`);
  // $ curl -v https://my-test-bucket.s3.us-east-1.amazonaws.com/ref-images/Napoleon.jpeg?AWSAccessKeyId=A***Z&Expires=1632111019&Signature=z***a --upload-file ./ref-images/Napoleon.jpeg
})();
