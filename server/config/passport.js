const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const users = require("../models/user-model");

const options = {
    secretOrKey: process.env.SECRET_KEY,
};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            users.findOne({ _id: jwt_payload._id })
                .then(user => {
                    if (user) done(null, user);
                    done(null, false);
                })
                .catch(err => done(err, false));
        })
    );
};