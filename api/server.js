// Initialize express app
import express from "express";
import bodyParser from "body-parser";

import { find, findById, insert, remove, update } from "./users/model.js";

const app = express();

app.use(bodyParser.json());

// GET ALL USERS
app.get("/api/students", async (req, res) => {
  const allUsers = await find();
  res.json(allUsers);
});

// GET USER BY ID

app.get("/api/students/:id", async (req, res) => {
  const user = await findById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ status: 404, message: "user-kaas lama helin" });
});

// CREATE A NEW USER
app.post("/api/students/add", async (req, res) => {
  const newUser = await insert(req.body);
  if (newUser) res.json(newUser);
  else res.json({ status: 404, message: "user-kas lama diiwaan galin" });
});

// UPDATE A USER

app.put("/api/students/update/:id", async (req, res) => {
  const updatedUser = await update(req.params.id, req.body);
  if (updatedUser) res.json(updatedUser);
  else res.status(400).json({ status: 400, message: "student was updated" });
});

// DELETE A USER

app.delete("/api/students/delete/:id", async (req, res) => {
  const deletedUser = await remove(req.params.id);
  if (deletedUser)
    res.json({
      status: 200,
      message: `the user with id:${req.params.id} has been successfully deleted`,
    });
  else
    res.status(400).json({
      status: 400,
      messge: `the user has not been successfully deleted`,
    });
});

// export default app
export default app;
