const Jimp = require('jimp');

Jimp.read('img/logo.png')
  .then(image => {
    return image.autocrop().writeAsync('img/logo.png');
  })
  .then(() => {
    console.log('Successfully cropped the transparent padded logo.');
  })
  .catch(err => {
    console.error('Error autocropping:', err);
  });
