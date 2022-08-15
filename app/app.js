const express = require('express');
const bodyParser = require('body-parser');
const wkhtmltopdf = require('wkhtmltopdf');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/status', (req, res) => {
    res.send("OK")
});

app.post('/', (req, res, next) => {
    try {
        let filename = req.query.name || 'Report'
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=${filename}.pdf`,
        });
        wkhtmltopdf(req.body.content, req.body.options).pipe(res);
    } catch (error) {
        next(error)
    }
});

app.listen(8080, function () {
    console.log('App listening on port 8080');
});
