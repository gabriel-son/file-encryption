import * as crypto from 'crypto';
import fileUpload, {UploadedFile} from 'express-fileupload';
import {Response} from 'express';
import {algoList} from '@shared/constants';

// Types
type Params = {
  algo: string;
  key: string;
  salt: string;
};

type option = string | null

type CryptFileFunction = (
  file: UploadedFile,
  decrypt: boolean,
  body: Params
) => Buffer;

// File encryption using parameters and salt
const cryptFileWithSalt: CryptFileFunction = (
  file,
  decrypt = false,
  {
    algo = 'aes-256-ctr',
    key = crypto.randomBytes(16).toString('hex'),
    salt = crypto.randomBytes(8).toString('hex'),
  }
): Buffer => {
  if (!decrypt) {
    const cipher = crypto.createCipheriv(algo, key, salt);
      return Buffer.concat([cipher.update(file.data), cipher.final()]);
  } else {
    const cipher = crypto.createDecipheriv(algo, key, salt);
      return Buffer.concat([cipher.update(file.data), cipher.final()]);
  }
};

// Checks if the file exists
const checkFile = (files: fileUpload.FileArray | undefined): boolean => {
  return !(!files || !files.file);
};

// Checks if every needed parameters exist
const checkParams = (key: string): boolean => {
  if (!key) {
    return false;
  }
  return true
};

// Set proper headers for the response
const setupHeaders = (res: Response, option: option, file?: UploadedFile | undefined) => {
    if (file) {
        if (option) {
            res.writeHead(200, {
                'Content-Type': file.mimetype,
                'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
                'Connection': 'close',
                'key': option
            })
        } else {
            res.writeHead(200, {
                'Content-Type': file.mimetype,
                'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
                'Connection': 'close',
            })
        }
    } else {
        res.writeHead(200, {
            'Connection': 'close'
        })
    }
}

export { cryptFileWithSalt, checkFile, checkParams, setupHeaders };
