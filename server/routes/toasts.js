const express = require("express");
const router = express.Router();
const Toast = require("../models/Toast");

router.get("/", async (req, res) => {
  try {
    const toasts = await Toast.find();
    res.json(toasts);
  } catch (err) {
    res.status(400).send("Couldn't get toasts");
    console.log(err);
  }
});

router.post("/new", (req, res) => {
  try {
    const { ingredients, toastTime, comment } = req.body;
    const toast = new Toast({
      ingredients,
      toastTime,
      comment,
    });

    toast.save();
    res.json(toast);
  } catch (err) {
    res.status(400).send("Couldn't create new toast");
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Toast.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).send("Couldn't delete toast");
    console.log(err);
  }
});

module.exports = router;
