const config = require('../dbconfig');//Instanciamos el archivo dbconfig para deploy
const util = require('util');//Se necesita para asyncroinificar la libreria de mysql
const mysql = require('mysql');//Se necesita paquete mysql

const db = makeDb(config); //crear acceso a BD asincronificadamente

//Asincronificar mysql, ver: https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
function makeDb(cfg) {
    const connection = mysql.createConnection(cfg);
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}


// devuelve usuario
async function getOne(email, pass) {
    try {
        const resultset = await db.query('SELECT * FROM users where email = ? and pass = ?', [email, pass]);
        console.log(resultset)
        return resultset;
    } catch (error) {
        console.log(error);
    }
}
// devuelve usuario con nombre
async function getOneByName(full_name) {
    try {
        const resultset = await db.query('SELECT * FROM users where full_name = ?', [full_name]);
        console.log(resultset)
        return resultset;
    } catch (error) {
        console.log(error);
    }
}
async function insertOne(user) {
    try {
        const resultset = await db.query('insert into users values(?,?,?,?)', [null,user.full_name,user.email, user.pass]);
        console.log(resultset)
        return resultset;
    } catch (error) {
        console.log(error);
    }
}
async function updatetOne(user) {
    try {
        const resultset = await db.query('update users set full_name = ?, email = ?, pass = ? where id = ?', [user.full_name,user.email, user.pass, user.id]);
        console.log(resultset)
        return resultset;
    } catch (error) {
        console.log(error);
    }
}
async function deleteOne(user) {
    try {
        const resultset = await db.query('delete from users where id = ?', [user.id]);
        console.log(resultset)
        return resultset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getOne : getOne,
    getOneByName : getOneByName,
    insertOne : insertOne,
    updatetOne : updatetOne,
    deleteOne : deleteOne
};