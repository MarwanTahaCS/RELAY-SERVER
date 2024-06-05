const crypto = require('crypto');

const apiKey = crypto.randomBytes(32).toString('base64');
console.log(apiKey);
