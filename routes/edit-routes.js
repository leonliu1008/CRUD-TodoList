const express = require("express");
const router = express.Router();
const TodoTask = require("../models/TodoTask");

router.get("/", (req, res) => {
  return res.redirect("/");
});

router.get("/:_id", async (req, res) => {
  //   const { _id } = req.params;
  //   console.log(_id);
  try {
    const { _id } = req.params;
    const task = await TodoTask.find();
    res.render("todoEdit.ejs", { task, _id });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.post("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const task = await TodoTask.findByIdAndUpdate(_id, {
      content: req.body.content,
    });
    res.redirect("/");
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

//DELETE
router.delete("/remove/:_id", async (req, res) => {
  //   let { _id } = req.params;
  //   res.send("此為刪除頁面");
  try {
    const { _id } = req.params;
    const task = await TodoTask.findOneAndDelete({ _id });
    console.log("刪除:" + _id);
    res.redirect("/");
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
