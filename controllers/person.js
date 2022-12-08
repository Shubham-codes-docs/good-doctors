const Person = require("../models/person");
const { validationResult } = require("express-validator");

exports.getPersons = async (req, res, next) => {
  const persons = await Person.find({});
  res.status(200).json({ persons });
};

exports.addPersons = async (req, res, next) => {
  const { name, age, gender, mobile } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      msg: "Incomplete fields.",
      status: 401,
    };
    next(error);
  }

  const newPerson = new Person({
    name,
    age,
    gender,
    mobile,
  });
  await newPerson.save();
  res.status(200).json({ msg: "User saved successfully" });
};

exports.editPerson = async (req, res, next) => {
  const id = req.params.id;
  const { name, age, gender, mobile } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      msg: "Incomplete fields.",
      status: 401,
    };
    next(error);
  }
  const person = await Person.findById({ _id: id });
  if (!person) {
    const error = {
      msg: "No such user found",
      status: 404,
    };
    next(error);
  }
  person.name = name;
  person.age = age;
  person.gender = gender;
  person.mobile = mobile;
  await person.save();
  res.status(200).json({ msg: "User updated successfully" });
};
