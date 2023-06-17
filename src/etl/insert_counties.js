import fs from "fs";
import csv from "csv-parser";
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  host: "amazondb.postgres.database.azure.com",
  port: "5432",
  user: "postgres",
  password: "VladimirSami1234",
  database: "web",
  ssl: true,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
    insertDataFromCSV();
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.trim().replace(/'/g, ""),
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

async function insertDataFromCSV() {
  const path = "D:/unx-data/2022/ianuarie/rata.csv";
  const judete = new Array();

  try {
    const rataData = await readFile(path);

    let index = 0;
    let crt = 0;

    for (let i = 0; i < rataData.length; i++) {
      if (
        !rataData[i].JUDET ||
        rataData[i].JUDET.trim().replace(/'/g, "") === "Total"
      ) {
        continue;
      } else {
        index = crt;

        if (rataData[i].JUDET.trim().replace(/'/g, "") === "MUN. BUC.") {
          crt--;
          index = 41;
        }

        judete[index] = rataData[i].JUDET.trim().replace(/'/g, "");

        crt++;
      }
    }

    judete[41] = "BUCURESTI";

    for (let j in judete) 
    {
      const insertQuery =`INSERT INTO counties (name) VALUES ('${judete[j]}');`;

      try {
        const result = await client.query(insertQuery);
        console.log(`Inserted row with name: ${judete[j]}`);
      } catch (err) {
        console.error("Error inserting CSV data: " + judete[j], err);
      }
    };
  } catch (error) {
    console.error("Error reading rata file:", error);
  }
  finally 
  {
    client.end();
  }
}
