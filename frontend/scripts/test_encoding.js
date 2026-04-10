const fs = require('fs');

const SQL_FILE_PATH = 'C:/Users/Alnimr/Desktop/Database files/u373770086_inatc.20260325183045.sql/database.sql';

async function testEncoding() {
    const fd = fs.openSync(SQL_FILE_PATH, 'r');
    const buffer = Buffer.alloc(10000);
    fs.readSync(fd, buffer, 0, 10000, 26950 * 50); // Seek to roughly where wp_posts starts
    fs.closeSync(fd);

    console.log("--- Reading as utf8 ---");
    console.log(buffer.toString('utf8').substring(0, 500));
    
    console.log("--- Reading as latin1 ---");
    console.log(buffer.toString('latin1').substring(0, 500));
}

testEncoding();
