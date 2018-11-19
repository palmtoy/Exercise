const dbOptions = require('./db-options');
const knex = require('knex')(dbOptions);

knex.from('cars').select("*")
    .then(dataRows => {
        for (row of dataRows) {
            console.log(`${row['id']} ${row['name']} ${row['price']}`);
        }
    })
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
