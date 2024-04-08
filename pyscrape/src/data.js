const sqlite3 = require("sqlite3").verbose()
const filepath = '/home/kush/scrapy/pyscrape/median.db' ;

function createDbConnection() {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        console.log(error.message) ;
        return console.error(error.message);
      }
    });
    console.log("Connection with SQLite has been established");
    return db;
  }

  createDbConnection() ;