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
app.get("/", (request, response) => {
  response.json(arr);
});
app.post("/", (request, response) => {
  arr.push(request.body);
  console.log(arr);
});
app.delete("/", (request, response) => {
  let id = request.query.id;
  arr = arr.filter((co) => co.id != id);
  response.send(arr);
});
app.listen(port, () => {
  console.log(`working on http://localhost:` + port);
});
