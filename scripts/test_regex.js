const fs = require('fs');
const SQL_FILE_PATH = 'C:/Users/Alnimr/Desktop/Database files/u373770086_inatc.20260325183045.sql/database.sql';

console.log("Reading file...");
const content = fs.readFileSync(SQL_FILE_PATH, 'utf8');

console.log("Searching for wp_posts blocks...");
const postBlocks = content.split("INSERT INTO `wp_posts` VALUES");

console.log("Post blocks found:", postBlocks.length - 1);

if (postBlocks.length > 1) {
    const block = postBlocks[1].substring(0, 10000);
    console.log("Block snippet:");
    console.log(block);
    
    // Test matching one values block manually without strict regex just to see
    // Let's capture the first (ID, author, 'date', 'dategmt', 'content', 'title', 'excerpt', 'status', ...
    const sqlString = "(?:'(?:[^'\\\\]|\\\\.)*')"; // handles ' and \'
    const regex = new RegExp("\\((\\d+),\\d+," + sqlString + "," + sqlString + ",(" + sqlString + "),([\\s\\S]*?)\\)", "g");
    
    const count = [...block.matchAll(regex)].length;
    console.log("Found matches with test regex:", count);
}
