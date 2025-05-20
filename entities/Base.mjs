"use strict"
import DBconnection from "../migration/db.mjs";
// constructor function of ingredient 
function Base() {
    this.id = undefined;
    this.name = undefined;

    this.fetch_all = () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtbase = db.db.prepare("SELECT * FROM Bases");
            stmtbase.all(function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let list_base = [];
                    for (let item of rows) {
                        let base = new Base();
                        base.id = item.id;
                        base.name = item.name;
                        list_base.push(base)
                    }
                    console.log("base fetches done");
                    resolve(list_base);
                }
            });
            stmtbase.finalize();
            db.db.close();

        });
    }
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtbase = db.db.prepare("SELECT * FROM Bases WHERE id = ?");
            stmtbase.get(id, function (err, row) {
                if (err || row == undefined) {
                    reject("base not found");
                } else {
                    let base_to_return = new Base();
                    base_to_return.id = row.id;
                    base_to_return.name = row.name;
                    console.log("base fetch done");
                    resolve(base_to_return);
                }
            });
            stmtbase.finalize();
            db.db.close();
        });
    }
}

export default Base;