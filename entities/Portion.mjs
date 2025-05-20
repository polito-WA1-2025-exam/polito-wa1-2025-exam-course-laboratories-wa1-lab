"use strict"
import DBconnection from "../migration/db.mjs";


// constructor function of poke_bowl 
function Portion() {
    this.name = undefined;
    this.id = undefined;
    this.base_price = undefined;
    this.amount_proteins = undefined;
    this.amount_ingredients = undefined;
    this.increase_percentage_ingredients = undefined;
    
    this.fetch_all = () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Portions");
            stmt.all(function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let list_portion = [];
                    for (let item of rows) {
                        let portion = new Portion();
                        portion.id = item.id;
                        portion.name = item.name;
                        portion.base_price = item.base_price;
                        portion.amount_proteins = item.amount_proteins;
                        portion.amount_ingredients = item.amount_ingredients;
                        portion.increase_percentage_ingredients = item.increase_percentage_ingredients;
                        list_portion.push(portion)
                    }
                    console.log("portion fetches done");
                    resolve(list_portion);
                }
            });
            stmt.finalize();
            db.db.close();
        }
        );
    }
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Portions WHERE id = ?");
            stmt.get(id, function (err, row) {
                if (err || row == undefined) {
                    reject("portion not found");
                } else {
                    let portion_to_return = new Portion();
                    portion_to_return.id = row.id;
                    portion_to_return.name = row.name;
                    portion_to_return.base_price = row.base_price;
                    portion_to_return.amount_proteins = row.amount_proteins;
                    portion_to_return.amount_ingredients = row.amount_ingredients;
                    portion_to_return.increase_percentage_ingredients = row.increase_percentage_ingredients;
                    console.log("portion fetch done");
                    resolve(portion_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
}

export default Portion;