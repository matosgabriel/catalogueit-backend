import path from 'path';
import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import IStorageProvider from '../models/IStorageProvider';

import uploadConfig from '../../../../../config/upload';

const { Bucket, region } = uploadConfig.config.s3;

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region,
    });
  }

  async saveFile(file: string): Promise<string> {
    const tempPath = path.resolve(uploadConfig.tmpFolder, file);

    const content = await fs.promises.readFile(tempPath);

    await this.client
      .putObject({
        Bucket,
        Key: file,
        ACL: 'public-read',
        Body: content,
        ContentType: 'image',
      })
      .promise();

    await fs.promises.unlink(path.resolve(uploadConfig.tmpFolder, file));

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
