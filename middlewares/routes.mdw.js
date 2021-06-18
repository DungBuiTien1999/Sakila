const auth = require("./auth.mdw");

module.exports = (app) => {
  app.use("/api/auth", require("../routes/auth.route"));
  app.use("/api/users", require("../routes/user.route"));
  app.use("/api/films", require("../routes/film.route"));
  app.use("/api/actors", auth, require("../routes/actor.route"));
  app.use("/api/cities", auth, require("../routes/city.route"));
  app.use("/api/countries", auth, require("../routes/country.route"));
  app.use("/api/categories", auth, require("../routes/category.route"));
};
