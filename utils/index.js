"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHeaders = exports.checkParams = exports.checkFile = exports.cryptFileWithSalt = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const cryptFileWithSalt = (file, decrypt = false, { algo = 'aes-256-ctr', key = crypto.randomBytes(16).toString('hex'), salt = crypto.randomBytes(8).toString('hex'), }) => {
    if (!decrypt) {
        const cipher = crypto.createCipheriv(algo, key, salt);
        return Buffer.concat([cipher.update(file.data), cipher.final()]);
    }
    else {
        const cipher = crypto.createDecipheriv(algo, key, salt);
        return Buffer.concat([cipher.update(file.data), cipher.final()]);
    }
};
exports.cryptFileWithSalt = cryptFileWithSalt;
const checkFile = (files) => {
    return !(!files || !files.file);
};
exports.checkFile = checkFile;
const checkParams = (key) => {
    if (!key) {
        return false;
    }
    return true;
};
exports.checkParams = checkParams;
const setupHeaders = (res, option, file) => {
    if (file) {
        if (option) {
            res.writeHead(200, {
                'Content-Type': file.mimetype,
                'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
                'Connection': 'close',
                'key': option
            });
        }
        else {
            res.writeHead(200, {
                'Content-Type': file.mimetype,
                'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
                'Connection': 'close',
            });
        }
    }
    else {
        res.writeHead(200, {
            'Connection': 'close'
        });
    }
};
exports.setupHeaders = setupHeaders;
