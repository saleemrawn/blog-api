import "dotenv/config";
import "./config/passport.js";
import express from "express";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";
import errorController from "./controllers/error.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", routes.auth);
app.use("/api/users", routes.user);
app.use("/api/posts", routes.post);
app.use("/api/posts", routes.comment);
app.use(errorController);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`App listening on port ${process.env.PORT}...`);
});
