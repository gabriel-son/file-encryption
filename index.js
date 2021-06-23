"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./LoadEnv");
const _server_1 = require("./Server");
const Logger_1 =require("./shared/Logger");
const stdin = process.openStdin();
stdin.addListener('data', (d) => {
    d = d.toString().trim();
    switch (d) {
        case ('uptime'):
            console.log(process.uptime());
            break;
        default:
            console.log('There is no such command!');
            break;
    }
});
const port = Number(process.env.PORT || 3000);
_server_1.default.listen(port, () => {
    Logger_1.default.info('Express server started on port: ' + port);
});
