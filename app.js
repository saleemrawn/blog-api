import "dotenv/config";
import "./config/passport.js";
import express from "express";
import routes from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", routes.auth);
app.use("/api/users", routes.user);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`App listening on port ${process.env.PORT}...`);
});
