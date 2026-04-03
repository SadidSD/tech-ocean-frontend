const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.serialize(() => {
    db.run("INSERT OR IGNORE INTO users (username, password, role) VALUES ('Zim', '1234', 'admin')");
    console.log('User Zim added/checked.');
});
db.close();
