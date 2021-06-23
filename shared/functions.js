"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = exports.pErr = void 0;
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("./Logger"));
const pErr = (err) => {
    if (err) {
        Logger_1.default.error(err);
    }
};
exports.pErr = pErr;
const getRandomInt = () => {
    return Math.floor(Math.random() * 1000000000000);
};
exports.getRandomInt = getRandomInt;
