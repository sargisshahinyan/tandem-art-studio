const fs = require('fs');
const path = require('path');

class ImagesSvc {
  static createPhoto(file, name = '', filePath = '') {
    return new Promise((resolve, reject) => {
      let extension;

      try {
        extension = file.match(/\/(.+?);/)[1];
      } catch (e) {
        return reject({
          message: 'Invalid image',
        });
      }

      name += `.${extension}`;
      file = file.replace(/http:\/\/|https:\/\//, '');

      fs.writeFile(
        path.resolve(path.normalize(`${APP_PATH}${filePath}${name}`)),
        file.replace(new RegExp(`^data:image\\/${extension};base64,`), ''),
        'base64',
        (err) => {
          if (err) throw err;

          resolve(path.normalize(name));
        },
      );
    });
  }

  static deletePhoto(path = '') {
    return new Promise((resolve) => {
      fs.access(path, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          resolve();
        }

        fs.unlink(path, resolve);
      });
    });
  }
}

module.exports = ImagesSvc;
