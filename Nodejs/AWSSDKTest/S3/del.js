#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
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

async function deleteObjects(bucketName, fileName) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Delete: {
        Objects: [{ Key: fileName }],
        Quiet: false,
      },
    };
    s3.deleteObjects(params, function (e, data) {
      if (e) {
        console.error(`_deleteObjects error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
    });
  });
}

function getSignedUrl(bucketName, fileName) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: fileName,
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

  const fileName = 'ref-images/Napoleon.jpeg';
  const s3delRes = await deleteObjects(bucketName, fileName);
  console.log(`s3delRes = ${JSON.stringify(s3delRes)}`);

  const s3presignedURL = getSignedUrl(bucketName, fileName);
  console.log(`s3presignedURL = ${s3presignedURL}`);
  // $ curl -v https://my-test-bucket.s3.us-east-1.amazonaws.com/ref-images/Napoleon.jpeg?AWSAccessKeyId=A***Z&Expires=1632111019&Signature=z***a --upload-file ./ref-images/Napoleon.jpeg
})();
