const request = require('request');
const Moment = require('moment-business-days');

class dataService {

    async getAllTrains(fromStation, toStation, authHeader) {
        Promise.all([this._getOutboundTrains(fromStation, toStation, authHeader),
                     this._getInboundTrains(fromStation, toStation, authHeader)
                    ]).then(trains => {
                        console.log(trains)
                        return;
                    });
    };

    async _getOutboundTrains(fromStation, toStation, authHeader) {
        const journey = this._journey(fromStation, toStation)
        const options = this._options(journey, authHeader)
        return await this._requestData(options)
    }

    async _getInboundTrains(fromStation, toStation, authHeader) {
        const journey = this._journey(toStation, fromStation)
        const options = this._options(journey, authHeader)
        return await this._requestData(options)
    }

    async _requestData(options) {
        return new Promise((resolve, reject) => {
            request(options, function(err, res, body) {
                resolve(body);
                if(err != null) {
                    throw new Error("ERROR: " + err)
                };
            })
        })
    }

    // dates currently don't account for UK public holidays
    _journey(station1, station2) {
        const toDate = new Moment().format("YYYY-MM-DD");
        const fromDate = new Moment().businessSubtract(20).format("YYYY-MM-DD");

        return {
            "from_loc":station1,
            "to_loc":station2,
            "from_time":"0000",
            "to_time":"2359",
            "from_date":fromDate,
            "to_date":toDate,
            "days":"WEEKDAY"
        }
    }

    _options(journey, authHeader) {
        return { url: 'https://hsp-prod.rockshore.net/api/v1/serviceMetrics',
                 method: 'POST',
                 headers: { 
                            "Authorization": `Basic ${authHeader}`,
                            "Content-Type": 'application/json'
                          },
                "body": JSON.stringify(journey)
                }
    } 
}

module.exports = dataService;