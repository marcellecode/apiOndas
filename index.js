const express = require('express');
const server = express();
const xml2js = require('xml2js');
const request = require('request')
const utf8 = require('utf8');

server.use(express.json());

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}; `);

    next();

    console.log('Finalizou');

    console.timeEnd('Request');
});


server.get('/actualday', (req, res) => {
    request('http://servicos.cptec.inpe.br/XML/cidade/3154/dia/0/ondas.xml', function (error, response, body) {
        //  console.log('error:', error); // Print the error if one occurred
        //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //  console.log('body:', body); // Print the HTML for the Google homepage.
        const dataBody = body;

        xml2js.parseString(dataBody, (err, result) => {
            if (err) {
                throw err;
            }
            const dataJson = JSON.stringify(result, null, 4);
            console.error('dadosMarica', utf8.encode(dataJson));
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Content-Type", "application/json; charset=utf-8");

            //const data = [news:[newsFeed]]

            return res.json({ data: result });
        });

    });
    
});

server.listen(3000);