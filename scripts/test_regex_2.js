const fs = require('fs');
const SQL_FILE_PATH = 'C:/Users/Alnimr/Desktop/Database files/u373770086_inatc.20260325183045.sql/database.sql';

console.log("Reading file...");
const content = fs.readFileSync(SQL_FILE_PATH, 'utf8');

const postBlocks = content.split("INSERT INTO `wp_posts` VALUES");
if (postBlocks.length > 1) {
    let block = postBlocks[1];
    const sqlString = "(?:NULL|'(?:[^'\\\\]|\\\\.)*')"; // properly handles newlines and escaping
    const recordRegex = new RegExp("\\((\\d+),\\d+," + sqlString + "," + sqlString + ",(" + sqlString + "),(" + sqlString + "),(" + sqlString + "),'publish'," + sqlString + "," + sqlString + "," + sqlString + ",'([^']*)',[\\s\\S]*?'post'", "g");
    
    // Test on the first 10MB of the block
    const shortBlock = block.substring(0, 10000000);
    const matches = [...shortBlock.matchAll(recordRegex)];
    console.log("Matches found:", matches.length);
    if(matches.length > 0) {
        console.log("ID:", matches[0][1]);
        console.log("Title snippet:", matches[0][3].substring(0, 30));
        console.log("Slug:", matches[0][5]);
    }
}
