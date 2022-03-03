const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const users = require("../models/user-model");

const options = {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
    users.findById(jwt_payload.user._id)
        .then(user => {
            if (user) return done(null, user);
            return done(null, false);
        })
        .catch(err => done(err, null));
})

module.exports = (passport) => {
    passport.use(jwtStrategy);
};