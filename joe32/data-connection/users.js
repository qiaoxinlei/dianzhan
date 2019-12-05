const knex = require('knex')
const ceshi =knex({
    client: 'sqlite3',
    connection: {
      filename: "./sqlite/HomeWork.db"
    }
})
module.exports = ceshi