import express from "express";
import cors from "cors";
import fs from "fs";
import { isUuid, uuid } from "uuidv4";
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
var deschutz = fs.readFileSync("db.json").toString();
var parsedDB = JSON.parse(deschutz);
function postData(data) {
  var main = parsedDB;
  main.push(JSON.parse(data));
  fs.writeFile("db.json", JSON.stringify(main), (err) => {
    if (err) {
      console.log("bad");
    } else {
      console.log("ok");
    }
  });
}
function deleteData(data) {
  var main = parsedDB;
  main = main.filter((obj) => obj.id != JSON.parse(data));
  fs.writeFile("db.json", JSON.stringify(main), (err) => {
    if (err) {
      console.log("bad");
    } else {
      console.log("ok");
    }
  });
}
function patchData(data) {
  var main = parsedDB;
  main = JSON.stringify(main);
  main = JSON.parse(main);
  let pro = JSON.parse(data);
  let objIndex = main.findIndex((obj) => obj.id == pro.id); // TODO: Find better way.
  main[objIndex].name = pro.name;
  main[objIndex].age = parseInt(pro.age);
  main[objIndex].password = pro.password;
  fs.writeFile("db.json", JSON.stringify(main), (err) => {
    if (err) {
      console.log("bad");
    } else {
      console.log("ok");
    }
  });
}
app.get("/users", (request, response) => {
  response.status(200);
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json(parsedDB);
});
app.post("/users", (request, response) => {
  let shaft = request.body;
  shaft.id = uuid();
  postData(JSON.stringify(shaft));
  response.sendStatus(200);
});
app.delete("/users", (request, response) => {
  let name = request.body.id;
  deleteData(JSON.stringify(name));
  response.sendStatus(200);
});
app.patch("/users", (request, response) => {
  patchData(JSON.stringify(request.body));
  response.sendStatus(200);
});
app.listen(port, () => {
  console.log(`working on http://localhost:` + port);
});
