// db.js
var postgres = require('postgres');

const sql = postgres({ /* options */ }) // will use psql environment variables


async function getUsersOver(age, cb) {
    await sql`
      select
        name,
        age
      from users
      where age > ${age}
    `
        .then((res) => {
            //console.log('sql', res);
            return cb(null, res);
        })
        .catch((error) => {
            console.log('sql', error);
            return cb('query failed: check log.')
        });
    // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
    // return users
}


async function insertUser({ name, age }) {
    const users = await sql`
      insert into users
        (name, age)
      values
        (${name}, ${age})
      returning name, age
    `
    // users = Result [{ name: "Murray", age: 68 }]
    return users
}

module.exports = {
    getUsersOver,
    insertUser,
    sql
};