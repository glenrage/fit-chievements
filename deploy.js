const s3 = require('s3');
const config = require('./deploy.config');

const client = s3.createClient({
  s3Options: {
    accessKeyId: config.AwsAccessKeyId,
    secretAccessKey: config.AwsSecretAccessKey,
    region: config.BucketRegion
  }
});

const uploader = client.uploadDir({
  localDir: process.argv[2],
  s3Params: {
    Bucket: config.Bucket,
    ACL: 'public-read'
  }
});

uploader.on('complete', function(){
    console.log(process.argv[2]+' uploaded to S3 bucket '+config.Bucket);
})
