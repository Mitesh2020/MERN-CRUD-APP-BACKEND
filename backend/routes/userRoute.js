const express = require("express");
const mongoose = require("mongoose");
const UserData = require("../models/userModel");
const router = express.Router();

// Parse JSON bodies (for POST requests)
router.use(express.json());

// Parse URL-encoded bodies (for POST requests with urlencoded data)
router.use(express.urlencoded({ extended: true }));

// create
router.post("/", async (req, res) => {
  console.log(req.body);

  const { name, email, age } = req.body;

  try {
    const userAdded = await UserData.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(201).json(userAdded);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// read
router.get("/", async (req, res) => {
  try {
    const showAll = await UserData.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await UserData.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await UserData.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await UserData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
