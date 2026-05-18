import express from "express";

const app = express();
const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`App listening on port ${PORT}...`);
});
