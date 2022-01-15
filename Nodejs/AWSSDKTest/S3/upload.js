#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios');
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'personal-account-long-term' });
// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const G_CONTENT_TYPE = 'binary';
const CODE_OK = 200;

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

function getSignedUrl(bucketName, filePath) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: filePath,
    Expires: 60 * 60 * 12, // signedUrlExpireSeconds
    ContentType: G_CONTENT_TYPE,
  });
}

async function uploadFileWithSignedUrl(url, filePath) {
  const retJson = { isOK: false, statusText: 'failed' };
  const fileData = fs.readFileSync(filePath);
  const reqConfig = {
    headers: {
      'Content-Type': G_CONTENT_TYPE,
    },
    timeout: 9 * 1000, // unit: ms
  };
  try {
    const res = await axios.put(url, fileData, reqConfig);
    if (res && res.status === CODE_OK) {
      retJson.isOK = true;
      retJson.statusText = res.statusText;
      return retJson;
    }
  } catch (e) {
    console.error(`\n_uploadFileWithSignedUrl error -- msg: "${e.message}"\n${e.response.data}\n`);
  }
  return retJson;
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
  const s3presignedURL = getSignedUrl(bucketName, filePath);
  console.log(`s3presignedURL = ${s3presignedURL}`);
  // $ curl -v https://my-test-bucket.s3.us-east-1.amazonaws.com/ref-images/Napoleon.jpeg?AWSAccessKeyId=A***Z&Expires=1632111019&Signature=z***a --upload-file ./ref-images/Napoleon.jpeg

  const s3UploadRet = await uploadFileWithSignedUrl(s3presignedURL, filePath);
  if (s3UploadRet && s3UploadRet.isOK) {
    console.log(`_s3UploadRet: ${filePath} upload ${s3UploadRet.statusText}`);
  } else {
    console.error(`_uploadFileWithSignedUrl: ${filePath} upload ${s3UploadRet.statusText}.`);
  }

  const s3objListB = await listObjects(bucketName);
  console.log(`s3objListB = ${JSON.stringify(s3objListB)}`);
})();
