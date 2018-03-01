class Creds {
    
    encodeBase64() {
        var password = process.env.NATIONAL_RAIL_EMAIL + ":" + process.env.NATIONAL_RAIL_PASSWORD
        return new Buffer(password).toString('base64')
    }
};

module.exports = Creds;