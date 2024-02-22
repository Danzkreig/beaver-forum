import express from "express";
import cors from "cors";
const app = express();
const port = 8080;
app.use(cors());
let arr = [
  {
    name: "Juliett",
    age: 33,
    Hobbies: ["Crack", "Meth", "Weed"],
    id: 1,
  },
  {
    name: "Romeo",
    age: 21,
    Hobbies: ["Letto", "Meth", "Weed"],
    id: 2,
  },
  {
    name: "Delta",
    age: 27,
    Hobbies: ["Arbeit", "Meth", "Weed"],
    id: 3,
  },
  {
    name: "Hotel",
    age: 39,
    Hobbies: ["Brod", "Meth", "Weed"],
    id: 4,
  },
];
app.get("/", (request, response) => {
  response.json(arr);
});
app.post("/", (request, response) => {
  let packet = {}; // creates packet of info
  packet.name = request.query.name;
  packet.age = parseInt(request.query.age);
  packet.id = parseInt(request.query.id);
  arr.push(packet); // puts packet in array.
  response.send(arr);
});
app.delete("/", (request, response) => {
  let id = request.query.id;
  arr = arr.filter((co) => co.id != id);
  response.send(arr);
});
app.app.listen(port, () => {
  console.log(`working on http://localhost:` + port);
});
