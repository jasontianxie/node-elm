'use strict';

import mongoose from 'mongoose';
import config from 'config-lite';
mongoose.connect(config.url, {server:{auto_reconnect:true}});
mongoose.Promise = global.Promise;//mongoose.promise是es6风格的constructor。http://mongoosejs.com/docs/api.html#ES6Promise-js

const db = mongoose.connection;//.connection属性表示的是与数据库的连接

db.once('open' ,() => {
	console.log('连接数据库成功')
})

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;
