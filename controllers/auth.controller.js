import passport from "passport";
import jwt from "jsonwebtoken";

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info, status) => {
    if (err) return next(err);

    if (!user) {
      return res.json({ success: false, message: "Authentication Failed" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Authentication Successful" });
  })(req, res, next);
};

const logout = (req, res, next) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Logout Successful" });
  } catch (error) {
    if (error.name === "TokenExpiredError") return next();
    next(error);
  }
};

const authenticateJWT = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) return reject(err);
      if (!user) return reject(new Error("Unauthorized"));
      resolve(user);
    })(req, res, next);
  });
};

const verify = async (req, res, next) => {
  try {
    req.user = await authenticateJWT(req, res, next);
    next();
  } catch (err) {
    next(err);
  }
};

const status = (req, res) => {
  res.json({ user: req.user });
};

export default {
  login,
  logout,
  verify,
  status,
};
