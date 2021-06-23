"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const index_1 = require("../utils/index");
const crypto = tslib_1.__importStar(require("crypto"));
const constants_1 = require("../shared/constants");
const router = express_1.Router();
router.post('/encrypt', (req, res) => {
    if (!req.files || !index_1.checkFile(req.files)) {
        return res.status(400).end('Please upload correct file');
    }
    req.body = {
        algo: 'aes-256-ctr',
        key: crypto.randomBytes(16).toString('hex'),
        salt: '337054f2e1433914',
    };
    const file = req.files.file;
    const encrypted = index_1.cryptFileWithSalt(file, false, req.body);
    index_1.setupHeaders(res, req.body.key, file);
    res.end(encrypted);
});
router.post('/decrypt', (req, res) => {
    if (!req.files || !index_1.checkFile(req.files)) {
        return res.status(400).end('Please upload correct file');
    }
    if (!index_1.checkParams(req.body)) {
        return res.status(400).end('Please provide correct parameters');
    }
    const file = req.files.file;
    req.body.algo = 'aes-256-ctr';
    req.body.salt = '337054f2e1433914';
    const decrypted = index_1.cryptFileWithSalt(file, true, req.body);
    index_1.setupHeaders(res, null, file);
    res.end(decrypted);
});
router.get('/algorithms', (req, res) => {
    res.send(JSON.stringify(constants_1.algoList));
});
exports.default = router;
