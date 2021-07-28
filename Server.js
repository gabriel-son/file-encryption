"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = require("cookie-parser");
const morgan_1 = require("morgan");
const helmet_1 = require("helmet");
const cors_1 = require("cors");
const express_fileupload_1 = require("express-fileupload");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
require("express-async-errors");
const routes_1 = require("./routes");
const Logger_1 = require("./shared/Logger");
const app = express_1();
const corsOption = {
    origin: true,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    exposedHeaders: ['key'],
};
app.use(express_1.json());
app.use(express_1.urlencoded({ extended: true }));
app.use(cookie_parser_1());
app.use(cors_1(corsOption));
app.use(express_fileupload_1({
    limits: {fileSize: 20 * 1024 * 1024},
    abortOnLimit: true,
}));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1());
}
app.use('/api', routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.message, err);
    return res.status(http_status_codes_1.BAD_REQUEST).json({
        error: err.message,
    });
});
exports.default = app;
