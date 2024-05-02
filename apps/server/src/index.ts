import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.post("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.listen(8080, () => {
  console.log("Running!");
});
