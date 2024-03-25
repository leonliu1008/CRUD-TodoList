const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
const editRoutes = require("./routes/edit-routes");
const methodOverride = require("method-override");
const Port = 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/crudDB")
  .then(() => {
    console.log("成功連結MongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

// view engine
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// routes
app.use("/edit", editRoutes);

app.get("/", async (req, res) => {
  try {
    const task = await TodoTask.find();
    res.render("todo.ejs", { task });
  } catch (e) {
    console.error("查詢任務出錯:", e);
    res.status(500).send("伺服器出錯!");
  }
});

app.post("/", async (req, res) => {
  // console.log(req.body);
  const todoTask = new TodoTask({
    content: req.body.content,
  });
  try {
    const data = await todoTask.save();
    console.log("成功上傳:" + data);
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

// 若沒有匹配的網址路由就會進入404
app.use((req, res, next) => {
  const err = new Error("頁面錯誤");
  err.status = 404;
  next(err);
});

// 處理error的 middleware
app.use((err, req, res, next) => {
  // console.log("正在使用middleware");
  return res.render("error404");
});

app.listen(Port, () => {
  console.log(`Server正在聆聽PORT:${Port}`);
});
