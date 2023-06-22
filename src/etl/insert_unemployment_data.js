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
  const months = [
    "ianuarie",
    "februarie",
    "martie",
    "aprilie",
    "mai",
    "iunie",
    "iulie",
    "august",
    "septembrie",
    "octombrie",
    "noiembrie",
    "decembrie",
  ];

  const path = "D:/unx-data/2022/";
  const rata = "/rata.csv";
  const varste = "/varste.csv";
  const medii = "/medii.csv";
  const educatie = "/educatie.csv";

  for (let m in months) {
    const month = months[m];

    let index = 0;
    let crt = 0;

    //console.log(month);

    const rataFile = path + month + rata;
    const mediiFile = path + month + medii;
    const varsteFile = path + month + varste;
    const educatieFile = path + month + educatie;

    let values = []; // values array for each month

    try {
      const rataData = await readFile(rataFile);

      //console.log(rataData);

      index = 0;
      crt = 0;

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

          values[index] = new Array();

          const mo = months.indexOf(month) + 1;

          if (mo > 9) {
            const data = "'2022-" + mo + "-01'";
            values[index].push(data);
          } else {
            const data = "'2022-" + "0" + mo + "-01'";
            values[index].push(data);
          }

          values[index].push(
            rataData[i]["Numar total someri"].replace(/,/g, "").trim()
          );
          values[index].push(
            rataData[i]["Numar total someri femei"].replace(/,/g, "").trim()
          );
          values[index].push(
            rataData[i]["Numar total someri barbati"].replace(/,/g, "").trim()
          );
          values[index].push(
            rataData[i]["Numar  someri indemnizati"].replace(/,/g, "").trim()
          );
          values[index].push(
            rataData[i]["Numar someri neindemnizati"].replace(/,/g, "").trim()
          );
          values[index].push(
            rataData[i]["Rata somajului (%)"].replace(/,/g, "").trim()
          );
          values[index].push(
            rataData[i]["Rata somajului Feminina (%)"].replace(/,/g, "").trim()
          );
          values[index].push(
            rataData[i]["Rata somajului Masculina (%)"].replace(/,/g, "").trim()
          );

          if(index == 41) console.log(values[index]);

          crt++;
        }
      }
    } catch (error) {
      console.error("Error reading rata file:", error);
    }

    try {
      const educatieData = await readFile(educatieFile);

      index = 0;
      crt = 0;

      for (let i = 0; i < educatieData.length; i++) {
        if (
          !educatieData[i].JUDET ||
          educatieData[i].JUDET.trim().replace(/'/g, "") === "Total general"
        ) {
          continue;
        } else {
          index = crt;

          if (educatieData[i].JUDET.trim().replace(/'/g, "") === "MUN. BUC.") {
            index = 41;
            crt--;
          }

          values[index].push(
            educatieData[i]["fara studii"].replace(/,/g, "").trim()
          );
          values[index].push(
            educatieData[i]["invatamant primar"].replace(/,/g, "").trim()
          );
          values[index].push(
            educatieData[i]["invatamant gimnazial"].replace(/,/g, "").trim()
          );
          values[index].push(
            educatieData[i]["invatamant liceal"].replace(/,/g, "").trim()
          );
          values[index].push(
            educatieData[i]["invatamant posticeal"].replace(/,/g, "").trim()
          );
          values[index].push(
            educatieData[i]["invatamant profesional/arte si meserii"]
              .replace(/,/g, "")
              .trim()
          );
          values[index].push(
            educatieData[i]["invatamant universitar"].replace(/,/g, "").trim()
          );

          crt++;
        }
      }
    } catch (error) {
      console.error("Error reading educatie file:", error);
    }

    try {
      const varsteData = await readFile(varsteFile);

      //console.log(varsteData);

      index = 0;
      crt = 0;

      for (let i = 0; i < varsteData.length; i++) {
        if (
          !varsteData[i].judet ||
          varsteData[i].judet.trim().replace(/'/g, "") === "TOTAL"
        ) {
          continue;
        } else {
          index = crt;

          if (
            varsteData[i].judet.trim().replace(/'/g, "") ===
            "MUNICIPIUL BUCURESTI"
          ) {
            index = 41;
            crt--;
          }

          values[index].push(
            varsteData[i]["Sub 25 ani"].replace(/,/g, "").trim()
          );
          values[index].push(
            varsteData[i]["25 - 29 ani"].replace(/,/g, "").trim()
          );
          values[index].push(
            varsteData[i]["30 - 39 ani"].replace(/,/g, "").trim()
          );
          values[index].push(
            varsteData[i]["40 - 49 ani"].replace(/,/g, "").trim()
          );
          values[index].push(
            varsteData[i]["50 - 55 ani"].replace(/,/g, "").trim()
          );
          values[index].push(
            varsteData[i]["peste 55 ani"].replace(/,/g, "").trim()
          );

          crt++;
        }
      }
    } catch (error) {
      console.error("Error reading educatie file:", error);
    }

    try {
      const mediiData = await readFile(mediiFile);

      index = 0;
      crt = 0;

      for (let i = 0; i < mediiData.length; i++) {
        if (
          !mediiData[i].JUDET ||
          mediiData[i].JUDET.trim().replace(/'/g, "") === "Total TARA"
        ) {
          continue;
        } else {
          index = crt;

          if (mediiData[i].JUDET.trim().replace(/'/g, "") === "BUCURESTI") {
            index = 41;
            crt--;
          }

          values[index].push(
            mediiData[i]["NUMAR TOTAL SOMERI DIN MEDIUL URBAN"]
              .replace(/,/g, "")
              .trim()
          );
          values[index].push(
            mediiData[i]["NUMAR TOTAL SOMERI DIN MEDIUL RURAL"]
              .replace(/,/g, "")
              .trim()
          );
          values[index].push(
            mediiData[i]["NUMAR SOMERI FEMEI DIN MEDIUL URBAN"]
              .replace(/,/g, "")
              .trim()
          );
          values[index].push(
            mediiData[i]["NUMAR SOMERI FEMEI DIN MEDIUL RURAL"]
              .replace(/,/g, "")
              .trim()
          );
          values[index].push(
            mediiData[i]["NUMAR SOMERI BARBATI DIN MEDIUL URBAN"]
              .replace(/,/g, "")
              .trim()
          );
          values[index].push(
            mediiData[i]["NUMAR SOMERI BARBATI DIN MEDIUL RURAL"]
              .replace(/,/g, "")
              .trim()
          );

          if (values[index].length != 28) {
            console.log(mediiData[i].JUDET + " " + values[index].length);
            return;
          }

          crt++;
        }
      }
    } catch (error) {
      console.error("Error reading medii file:", error);
    }

    console.log(month + " " + values.length);

    for (let value in values) {
      const county_id = values.indexOf(values[value]) + 1;

      //console.log(county_id + "," + values[value].join(','));
      const insertQuery =
        //`SELECT * FROM counties;`;
        `insert into unemployment 
       (id_county,
         period,
          total,
          females,
          males, 
          paid, 
          unpaid, 
          unemployment_rate, 
          females_unemployment_rate, 
          males_unemployment_rate,
          no_studies,
          primar,
          gimnazial,
          highschool,
          post_highschool,
          professional,
          universitar,
          under25,
          between25_29,
          between30_39,
          between40_49,
          between50_55,
          over55,
          urban,
          rural,
          females_urban,
          females_rural,
          males_urban,
          males_rural)
          VALUES (${county_id + "," + values[value].join(',')})`;

      /*try {
        const result = await client.query(insertQuery);
        console.log(`Inserted row: ${county_id}`);
      } catch (err) {
        console.error(county_id + "," + values[value].join(',') + ", Error inserting CSV data: ", err);
      }*/
    }
  }

  client.end();
}
