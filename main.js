const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ip = require('ip');
const log = require('logtools');
const path = require('path');
const config = require('./config.json');
const morgan = require('morgan');

app.use('/cli', express.static(`${__dirname}/cli/`));

app.enable("case sensitive routing");

require('./controller/logger.js')(app, io);
require('./controller/controller.js')(app, io);
require('./controller/errors.js')(app, io);

http.listen(config.port, () => {
    log.info(`Node Server is setup and it is listening on http://${ip.address()}:${config.port}`);
})
