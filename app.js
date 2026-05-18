import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`App listening on port ${process.env.PORT}...`);
});
