import sqlite3 from 'sqlite3';
import { readFile } from 'fs/promises';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// Convert `import.meta.url` to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define database file path
const dbPath = join(__dirname, 'mydatabase.db');

// Open (or create) the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("SQLite database created successfully.");
    }
});
// Function to read JSON file and import data into a variable
async function importJsonData(filePath) {
    const file = path.resolve(__dirname, filePath);
    const rawData = await readFile(file);
    const data = JSON.parse(rawData);
    return data;
}
// Function to create tables
async function createTables() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Portions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      base_price REAL NOT NULL,
      amount_proteins INTEGER NOT NULL,
      amount_ingredients INTEGER NOT NULL,
      increase_percentage_ingredients REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Proteins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Bases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Poke (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      price REAL NOT NULL,
      base_id INTEGER,
      order_id INTEGER,
      portion_id INTEGER,
      FOREIGN KEY (base_id) REFERENCES Bases(id),
      FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (portion_id) REFERENCES Portions(id)
    );

    CREATE TABLE IF NOT EXISTS PokeProteins (
      poke_id INTEGER,
      protein_id INTEGER,
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      FOREIGN KEY (poke_id) REFERENCES Poke(id),
      FOREIGN KEY (protein_id) REFERENCES Proteins(id)
    );

    CREATE TABLE IF NOT EXISTS PokeIngredients (
      poke_id INTEGER,
      ingredient_id INTEGER,
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      FOREIGN KEY (poke_id) REFERENCES Poke(id),
      FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
    );

    CREATE TABLE IF NOT EXISTS Orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total_price REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      salt TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `;

    await db.exec(sql, (err) => {
        if (err) {
            console.error('Error creating tables:', err);
        } else {
            console.log('Tables created successfully');
        }
    });
}

// Function to seed the tables with initial data
async function seedTables() {

    const portions = await importJsonData("../stubs/portions.json");
    const proteins = await importJsonData("../stubs/proteins.json");
    const bases = await importJsonData("../stubs/bases.json");
    const ingredients = await importJsonData("../stubs/ingredients.json");

    const stmtPortions = db.prepare('INSERT INTO Portions (name, base_price, amount_proteins, amount_ingredients, increase_percentage_ingredients) VALUES (?, ?, ?, ?, ?)');
    const stmtProteins = db.prepare('INSERT INTO Proteins (name) VALUES (?)');
    const stmtBases = db.prepare('INSERT INTO Bases (name) VALUES (?)');
    const stmtIngredients = db.prepare('INSERT INTO Ingredients (name) VALUES (?)');

    portions.forEach(portion => {
        stmtPortions.run(portion.name, portion.base_price, portion.amount_proteins, portion.amount_ingredients, portion.increase_percentage_ingredients);
    });

    proteins.forEach(protein => {
        stmtProteins.run(protein.name);
    });

    bases.forEach(base => {
        stmtBases.run(base.name);
    });

    ingredients.forEach(ingredient => {
        stmtIngredients.run(ingredient.name);
    });

    stmtPortions.finalize();
    stmtProteins.finalize();
    stmtBases.finalize();
    stmtIngredients.finalize();

    console.log('Tables seeded successfully');
}

// Function to query the tables
async function queryTables() {
    db.all('SELECT * FROM Portions', [], (err, rows) => {
        if (err) {
            console.error('Error querying Portions table:', err);
        } else {
            console.log('Portions:', rows);
        }
    });

    db.all('SELECT * FROM Proteins', [], (err, rows) => {
        if (err) {
            console.error('Error querying Proteins table:', err);
        } else {
            console.log('Proteins:', rows);
        }
    });

    db.all('SELECT * FROM Bases', [], (err, rows) => {
        if (err) {
            console.error('Error querying Bases table:', err);
        } else {
            console.log('Bases:', rows);
        }
    });

    db.all('SELECT * FROM Ingredients', [], (err, rows) => {
        if (err) {
            console.error('Error querying Ingredients table:', err);
        } else {
            console.log('Ingredients:', rows);
        }
    });
}

// Main function to execute the steps
async function main() {
    await createTables();
    await seedTables();
    await queryTables();

    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
    });
}

// Run the main function
main();

