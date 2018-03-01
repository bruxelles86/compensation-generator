const Creds = require('./creds.js')
const dataService = require('./dataService.js')

class Controller {
    constructor() {
        this.creds = new Creds();
        this.dataService = new dataService();
    }

    logAllTrains() {
        this.dataService.getAllTrains('FPK', 'OLD', this.creds.encodeBase64())
    }
}

module.exports = Controller;