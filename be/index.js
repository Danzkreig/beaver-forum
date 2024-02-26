import express from "express";
import cors from "cors";
import fs from "fs";
import { uuid } from "uuidv4";
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
function getData() {
  let data = fs.readFileSync("poop.json").toString();
  let parsed = JSON.parse(data);
  console.log(parsed);
  return parsed;
}
function editData(type, data) {
  var main = getData();
  if (type === "post") {
    main.push(JSON.parse(data));
    fs.writeFile("poop.json", JSON.stringify(main), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Post working");
      }
    });
  } else if (type === "delete") {
    main = main.filter((obj) => obj.id != JSON.parse(data));
    fs.writeFile("poop.json", JSON.stringify(main), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("all good");
      }
    });
  } else if (type === "patch") {
    main = JSON.stringify(main);
    main = JSON.parse(main);
    let pro = JSON.parse(data);
    let objIndex = main.findIndex((obj) => obj.id == pro.id); // TODO: Find better way.
    main[objIndex].name = pro.name;
    main[objIndex].age = parseInt(pro.age);
    main[objIndex].password = pro.password;
    fs.writeFile("poop.json", JSON.stringify(main), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("all good");
      }
    });
  }
}
app.get("/users", (request, response) => {
  response.statusCode = 200;
  response.json(getData());
  console.log("Was Get");
});
app.post("/users", (request, response) => {
  let shaft = request.body;
  shaft.id = uuid();
  editData("post", JSON.stringify(shaft));
  console.log(identify);
  response.sendStatus(200);
});
app.delete("/users", (request, response) => {
  let name = request.body.id;
  editData("delete", JSON.stringify(name));
  response.sendStatus(200);
});
app.patch("/users", (request, response) => {
  editData("patch", JSON.stringify(request.body));
  console.log(request.body);
  response.sendStatus(200);
});
app.listen(port, () => {
  console.log(`working on http://localhost:` + port);
});
