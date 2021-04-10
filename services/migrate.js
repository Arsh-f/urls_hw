const db = require('./db');

db.promise().execute('CREATE TABLE IF NOT EXISTS `urls` ( id bigint unsigned PRIMARY KEY AUTO_INCREMENT, url text(2000) );')