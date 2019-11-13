/*
 * 删除指定的文件
 */
const del = require('del');
const config = require('../config');

del(config.cleanFiles);
