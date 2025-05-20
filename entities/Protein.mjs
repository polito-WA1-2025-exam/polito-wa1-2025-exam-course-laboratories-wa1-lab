"use strict"
import DBconnection from "../migration/db.mjs";

// constructor function of protein 
function Protein() {
    this.name = undefined;
    this.id = undefined;
    this.fetch_all = () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Proteins");
            stmt.all(function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let list_protein = [];
                    for (let item of rows) {
                        let protein = new Protein();
                        protein.id = item.id;
                        protein.name = item.name;
                        list_protein.push(protein)
                    }
                    console.log("proteins fetches done");
                    resolve(list_protein);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Proteins WHERE id = ?");
            stmt.get(id, function (err, row) {
                if (err || row == undefined) {
                    reject("protein not found");
                } else {
                    let protein_to_return = new Protein();
                    protein_to_return.id = row.id;
                    protein_to_return.name = row.name;
                    console.log("protein fetch done");
                    resolve(protein_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
}


export default Protein;