"use strict"
import DBconnection from "../migration/db.mjs";
import Protein from "../entities/Protein.mjs";
import Poke from "../entities/Poke.mjs";
// constructor function of Pokeproteins
function PokeProteins() {
    this.id = undefined;

    // this.check_line_in_table = (poke_id, protein_id) => {
    //     return new Promise((resolve, reject) => {
    //         let db = new DBconnection();
    //         let stmt = db.db.prepare("SELECT * FROM Pokeproteins WHERE poke_id = ? AND protein_id = ?");
    //         stmt.get(poke_id, protein_id, function (err, row) {
    //             if (row == undefined || err) {
    //                 reject("protein or pokebowl not found");
    //             } else {
    //                 resolve("protein in pokebowl");
    //             }
    //         });
    //         stmt.finalize();
    //         db.db.close();
    //     });
    // }

    this.check_poke_in_table = (poke_id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtpoke = db.db.prepare("SELECT * FROM Pokeproteins WHERE poke_id = ?");
            stmtpoke.all(poke_id, function (err, rows) {
                if (rows.length == 0 || err ) {
                    reject("this pokebowl has no protein");
                } else {
                    resolve("pokebowl has protein");
                }
            });
            stmtpoke.finalize();
            db.db.close();
        });
    }

    this.fetch_by_poke_id = async (id) => {
        try {
            await this.check_poke_in_table(id)
        }
        catch (e){
            throw new Error(e);
        }
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtprotein = db.db.prepare("SELECT protein_id FROM Pokeproteins WHERE poke_id = ?");
            stmtprotein.all(id, function (err, rows) {
                if (rows.length == 0 || err ) {
                    reject("no protein found for this pokebowl");
                } else {
                    let result = []
                    for (let item of rows){
                        result.push(item.protein_id)
                    }
                    console.log("proteins fetch done");
                    resolve(result);
                }
            });
            stmtprotein.finalize();
            db.db.close();
        });
    }

    this.delete_proteins = async (poke_id) => {
        console.log(poke_id);
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("DELETE FROM Pokeproteins WHERE poke_id = ?");
            stmt.run(poke_id, function (err) {
                if (err) {
                    reject("protein not in pokebowl");
                }
                else {
                    resolve("protein delete done");
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
    this.insert_protein = async (poke_id, protein_id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("INSERT INTO Pokeproteins (poke_id,protein_id) VALUES (?,?)");
            stmt.run(poke_id, protein_id, function (err) {
                if (err || this.lastID == undefined) {
                    reject(err);
                }
                else {
                    console.log("protein insert done");
                    resolve(this.lastID);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
}

export default PokeProteins;