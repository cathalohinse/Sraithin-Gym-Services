"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const uuid = require("uuid");
const BMI = require("../utils/bmi.js");
const BMICategory = require("../utils/bmi-category.js");
const idealBodyWeight = require("../utils/ideal-body-weight");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering, so it is");
    const memberId = request.params.id;
    const loggedInMember = accounts.getCurrentMember(request);
    const assessmentId = request.params.id;
    const viewData = {
      title: "member Dashboard",
      member: memberStore.getMemberById(loggedInMember.id),
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id).reverse(),
      BMI: BMI.BMICalculation(loggedInMember.id),
      BMICategory: BMICategory.BMICategory(loggedInMember.id),
      idealBodyWeight: idealBodyWeight.isIdealBodyWeight(loggedInMember.id),
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },

addMember(request, response) {
    const newMember = {
      id: uuid.v1(),
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startWeight: request.body.startWeight,
    };
  logger.debug("Creating a new member", newMember);
  memberStore.addMember(newMember);
  response.redirect("/dashboard");
},

};

module.exports = dashboard;