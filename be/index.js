import express from "express";
import cors from "cors";
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
let arr = [
  {
    name: "fafaa",
    age: 33,
    password: "password",
    id: 1,
  },
  {
    name: "ooo",
    age: 16,
    password: "newyork2011",
    id: 2,
  },
  {
    name: "king",
    age: 23,
    password: "robotdog330",
    id: 3,
  },
];
var identify = 4;
app.get("/users", (request, response) => {
  response.statusCode = 200;
  response.json(arr);
  console.log(arr);
});
app.post("/users", (request, response) => {
  let shaft = request.body;
  shaft.id = identify;
  identify++;
  arr.push(shaft);
  response.sendStatus(200);
});
app.delete("/users", (request, response) => {
  let name = request.body.id;
  arr = arr.filter((co) => co.id != name);
  console.log(arr);
  response.sendStatus(200);
});
app.patch("/users", (request, response) => {
  let objIndex = arr.findIndex((obj) => obj.id == request.body.id);
  arr[objIndex].name = request.body.name;
  arr[objIndex].age = request.body.age;
  arr[objIndex].password = request.body.password;
  console.log(request.body);
  response.sendStatus(200);
});
app.listen(port, () => {
  console.log(`working on http://localhost:` + port);
});
