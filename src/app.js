const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const weather = require("./utils/weather-forcast");

const app = express();
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    creator: "Devesh",
  });
});

const publicDir = path.join(__dirname, "../public/");
const veiwsPath = path.join(publicDir, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));
app.set("view engine", "hbs");
app.set("views", veiwsPath);

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    creator: "Devesh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    creator: "Devesh",
  });
});

/*app.get("", (req, res) => {
  res.send("<h1>Welcome to express!</h1>");
});
app.get("/help", (req, res) => {
  res.send("What Help Do You Need!!");
});
app.get("/about", (req, res) => {
  // res.send("<h1>Hey! What us up about!!</h1>");
});*/
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Invalid Location:Empty String",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      weather(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          weather_news: forecastData,
        });
      });
    }
  );
  // res.send({
  //   weather: 10,
  //   location: "Shimla",
  //   address: req.query.address,
  // });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    content: "Oops!Help Article Not Found.",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    content: "Oops!Page Not Found.",
  });
});
app.listen(3000, () => {
  console.log("The Server Is Starting Up At Port 3000.");
});
