const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:8001/auth/google/callback",
        // passReqToCallback: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("google profile", profile);
        // test
        // const {
        //   _json: { IDBCursor, avatar_url, login: name, email },
        // } = profile;
        try {
          const exUser = await User.findOne({
            where: { email: profile.email, provider: "google" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.google_account_email,
              nickName: profile.displayName,
              boardId: profile.id,
              provider: "google",
            });
            done(null, newUser);
          }

          // test
          // const user = await User.findOne({ email: email });
          // if (user) {
          //   user.boardId = id;
          //   user.save();
          //   return done(null, user);
          // } else {
          //   const newUser = await User.create({
          //     email,
          //     nickName,
          //     boardId: id,
          //     avatarUrl: avatar_url,
          //   });
          //   return done(null, newUser);
          // }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
