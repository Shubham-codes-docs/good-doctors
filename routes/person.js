const express = require("express");
const { body } = require("express-validator");

const person = require("../controllers/person");

const route = express.Router();

//GET request
route.get("/person", person.getPersons);

//POST request
route.post(
  "/person",
  [
    body("name").notEmpty(),
    body("age").notEmpty().isNumeric(),
    body("gender").notEmpty(),
    body("mobile").notEmpty(),
  ],
  person.addPersons
);

//PUT request
route.put(
  "/person/:id",
  [
    body("name").notEmpty(),
    body("age").notEmpty().isNumeric(),
    body("gender").notEmpty(),
    body("mobile").notEmpty(),
  ],
  person.editPerson
);

route.delete("/person/:id");

module.exports = route;
