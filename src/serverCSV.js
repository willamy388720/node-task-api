import { parse } from "csv-parse";
import * as fs from "fs";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.17:3333",
});

(async () => {
  const result = [];

  fs.createReadStream("./data.csv")
    .pipe(parse())
    .on("data", (data) => {
      result.push(data);
    })
    .on("end", () => {
      result.shift();
      result.forEach(async (item) => {
        try {
          await api.post("/tasks", { title: item[0], description: item[1] });
        } catch (error) {
          console.log(error);
        }
      });
    });
})();
