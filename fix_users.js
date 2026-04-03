const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.serialize(() => {
    db.run("UPDATE users SET password='1234' WHERE username='Zim'");
    db.run("UPDATE users SET password='1234' WHERE username='ZIm'");
    db.run("UPDATE users SET password='1234' WHERE username='zim'");
    db.run("INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin')");
    console.log('Fixed users passwords');
});
db.close();
