import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import {
  checkFile,
  checkParams,
  setupHeaders,
  cryptFileWithSalt,
} from '@utils/index';
import * as crypto from 'crypto';
import { algoList } from '@shared/constants';

// Init router and path
const router = Router();

// Add sub-routes
router.post('/encrypt', (req, res) => {
  if (!req.files || !checkFile(req.files)) {
    return res.status(400).end('Please upload correct file');
  }
  req.body = {
    algo: 'aes-256-ctr',
    key: crypto.randomBytes(16).toString('hex'),
    salt: '337054f2e1433914',
  }
  const file: UploadedFile = req.files.file as UploadedFile;

  const encrypted = cryptFileWithSalt(file, false, req.body);
  setupHeaders(res, req.body.key, file);
  res.end(encrypted);
});

router.post('/decrypt', (req, res) => {
  if (!req.files || !checkFile(req.files)) {
    return res.status(400).end('Please upload correct file');
  }
  if (!checkParams(req.body)) {
    return res.status(400).end('Please provide correct parameters');
  }
  const file: UploadedFile = req.files.file as UploadedFile;
  req.body.algo =  'aes-256-ctr';
  req.body.salt  = '337054f2e1433914';
  const decrypted = cryptFileWithSalt(file, true, req.body);
  setupHeaders(res, null, file);
  res.end(decrypted);
});

router.get('/algorithms', (req, res) => {
  res.send(JSON.stringify(algoList));
});

// Export the base-router
export default router;
