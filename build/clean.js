/*
 * 清理文件或者文件夹脚本
 * by KyLeo 2017.09.13
 */
const fs = require('fs');
const config = require('../config');

const deleteFolderRecursive = path => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(file => {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const cleanFile = list => {
  console.log('');
  console.log('[clean.js]: task start.....');
  list.forEach(path => {
    try {
      // 判断文件或者文件夹是否存在
      fs.statSync(path).isDirectory();
    } catch (ex) {
      // 不存在时会抛异常
      console.log('[clean.js]: "' + path + '" is not exist.');
      return;
    }
    if (fs.statSync(path).isDirectory()) {
      deleteFolderRecursive(path);
    } else {
      fs.unlinkSync(path);
    }
    console.log('[clean.js]: "' + path + '" is deleted.');
  });
  console.log('[clean.js]: task complete.....');
};

cleanFile(config.cleanFiles);

module.exports = cleanFile;
