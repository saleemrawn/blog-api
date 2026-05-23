import passport from "passport";
import LocalStrategy from "passport-local";
import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userRepository.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }),
);

const options = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET };

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await userRepository.getUserById(payload.user.id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      return done(null, {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        deletedAt: user.deletedAt,
      });
    } catch (error) {
      done(error, false);
    }
  }),
);
