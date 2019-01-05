const AWS = require('aws-sdk');
const uuid = require('uuid');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

console.log(keys.accessKeyId);
console.log(keys.secretAccessKey);
console.log(keys.region);

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region: keys.region
});

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        const key = `${req.user.id}/${uuid()}.jpeg`;

        s3.getSignedUrl(
            'putObject',
            {
                Bucket: 'node-blog',
                ContentType: 'image/jpeg',
                Key: key
            },
            (err, url) => {
                console.log(err);
                console.log(key);
                console.log(url);
                res.send({ key, url });
            }
        );
    });
};
