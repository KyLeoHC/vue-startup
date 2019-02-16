const fs = require('fs');
const postcss = require('postcss');
const px2rem = require('../index');

fs.readFile('./test.css', (err, css) => {
  if (err) {
    console.error(err);
    return;
  }
  postcss([px2rem({ remUnit: 75 })])
    .process(css, { from: './test.css', to: './test.build.css' })
    .then(result => {
      fs.writeFile('./test.build.css', result.css);
      if (result.map) fs.writeFile('./test.build.css.map', result.map);
    });
});
