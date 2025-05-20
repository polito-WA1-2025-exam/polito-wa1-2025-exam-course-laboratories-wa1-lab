import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// Convert `import.meta.url` to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import sqlite3 from 'sqlite3';
const dbPath = join(__dirname, '/mydatabase.db');
console.log(dbPath);

class DatabaseConnection {
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("Error opening database:", err.message);
        // } else {
        //     console.log("SQLite database created successfully.");
        }
    });
}

export default DatabaseConnection;