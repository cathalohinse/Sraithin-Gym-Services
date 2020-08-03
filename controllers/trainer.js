"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const assessmentStore = require("../models/assessment-store");
const trainerStore = require("../models/trainer-store");
const uuid = require("uuid");
const memberStore = require("../models/member-store.js");
const BMI = require("../utils/bmi.js");
const BMICategory = require("../utils/bmi-category.js");
const idealBodyWeight = require("../utils/ideal-body-weight");

const trainer = {
  index(request, response) {
    const trainerId = request.params.id;
    //const memberId = request.params.id;
    logger.debug("trainer id = ", trainerId);
    const viewData = {
      title: "trainer",
      trainer: trainerStore.getTrainerById(trainerId),
      members: memberStore.getAllMembers(),
      //member: memberStore.getMemberById(memberId),
      //assessments: assessmentStore.getMemberAssessments(memberId).reverse(),
    };
    response.render("trainer", viewData);
  },
  
  addAssessment(request, response) {
    const loggedIntrainer = accounts.getCurrentTrainer(request);
    const newAssessment = {
      id: uuid.v1(),
      trainerid: loggedIntrainer.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    logger.debug("Creating a new assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
  trainerMember(request, response){
    const memberId = request.params.id;
    const viewData = {
      title: "Trainer's Portal for individual Member",
      member: memberStore.getMemberById(memberId),
      assessments: assessmentStore.getMemberAssessments(memberId).reverse(),
      BMI: BMI.BMICalculation(memberId),
      BMICategory: BMICategory.BMICategory(memberId),
      idealBodyWeight: idealBodyWeight.isIdealBodyWeight(memberId)
    };
    response.render("trainermember", viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    const memberName = memberStore.getMemberById(memberId).name;
    logger.debug(`Deleting member ${memberId}`);
    logger.info(`Deleting member ${memberName}`);
    memberStore.removeMember(memberId);
    assessmentStore.removeAllAssessmentsByMember(memberId);
    response.redirect("/trainer/");
  },
  
  addComment(request, response){
    const assessmentId = request.params.id;
    const memberId = request.params.memberid;
    const memberName = memberStore.getMemberById(memberId).name;
    const newComment = {
      id: assessmentId,
      member: memberStore.getMemberByAssessmentId(assessmentId),
      comment: request.body.comment
    };
    logger.debug("Inputting a new comment", newComment.comment);
    logger.info(`Inputting a new comment on assessment (${assessmentId}) of ${memberName}. The comment is: ${newComment.comment}`);
    assessmentStore.addComment(assessmentId, newComment.comment);
    response.redirect("/trainermember/"+memberId);
  },
  
};

module.exports = trainer;