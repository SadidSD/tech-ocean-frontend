const Jimp = require('jimp');

Jimp.read('img/logo.png')
  .then(image => {
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const size = Math.max(width, height);
    
    // Create a new perfectly square image with a transparent background
    new Jimp(size, size, 0x00000000, (err, squareImage) => {
      if (err) throw err;
      
      // Paste the rectangular logo directly into the center of the square
      squareImage.composite(image, (size - width) / 2, (size - height) / 2)
        .write('img/favicon.png', () => {
             console.log('Successfully generated square favicon.');
        });
    });
  })
  .catch(err => {
    console.error('Error generating favicon:', err);
  });
