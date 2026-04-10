const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'galaxy.db');
const db = new Database(dbPath);

console.log('Updating database paths...');

try {
  // Update Palace Mandap
  db.prepare("UPDATE gallery SET src = '/photos/wedding-1.png' WHERE title = 'Palace Mandap'").run();

  // Update Sangeet Night
  db.prepare("UPDATE gallery SET src = '/photos/wedding-3.jpg' WHERE title = 'Sangeet Night'").run();

  console.log('Database paths updated successfully.');
} catch (error) {
  console.error('Error updating database:', error);
} finally {
  db.close();
}
