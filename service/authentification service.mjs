import crypto from 'crypto';
import DBconnection from "../migration/db.mjs";

export const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        let db = new DBconnection();
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.db.get(sql, [username], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) { resolve(false); }
            else {
                const user = { id: row.id, username: row.username };
                const salt = row.salt;
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);
                    if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
                        resolve(false);
                    else resolve(user);
                });
            }
        });
    });
};