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
  },
  {
    name: "ooo",
    age: 16,
    password: "newyork2011",
  },
  {
    name: "king",
    age: 23,
    password: "robotdog330",
  },
];
app.get("/users", (request, response) => {
  response.json(arr);
  response.sendStatus(200);
});
app.post("/users", (request, response) => {
  arr.push(request.body);
  response.sendStatus(200);
});
app.delete("/users", (request, response) => {
  let name = request.body.name;
  arr = arr.filter((co) => co.name != name);
  console.log(arr);
  response.sendStatus(200);
});
app.listen(port, () => {
  console.log(`working on http://localhost:` + port);
});
