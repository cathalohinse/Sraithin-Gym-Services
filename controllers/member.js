"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store");
const uuid = require("uuid");

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug("member id = ", memberId);
    const viewData = {
      title: "member",
      member: memberStore.getMemberById(memberId),
    };
    response.render("member", viewData);
  },
  
  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const assessments = assessmentStore.getMemberAssessments(loggedInMember.id);
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"\n"+(today.getHours()+1) + ":" + today.getMinutes() + ":" + today.getSeconds();
    const newAssessment = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      date: date,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      feedback: undefined,
      trend(){
        const assessments = assessmentStore.getMemberAssessments(loggedInMember.id);
        let trend;
        if(assessments.indexOf(newAssessment)===0){
          if(assessments[assessments.indexOf(newAssessment)].weight<member.startWeight){
            trend = true;
          }
          else{
            trend = false;
          }
        }
        else if(assessments[assessments.indexOf(newAssessment)].weight<assessments[(assessments.indexOf(newAssessment))-1].weight){
          trend = true;
        }
        else{
          trend = false;
        }
        return trend;
      },
    };
    logger.debug("Creating a new assessment", newAssessment);
    logger.info(`Creating a new assessment ${newAssessment.id} on ${loggedInMember.name}`);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Deleting assessment ${assessmentId}`);
    logger.info(`Deleting assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  },
  
  updateMember(request, response) {
    const memberId = request.params.id;
    const loggedInMember = memberStore.getMemberById(memberId);
    if(request.body.name!==""){
      loggedInMember.name = request.body.name;
    }
    if(request.body.email!==""){
      loggedInMember.email = request.body.email;
    }
    if(request.body.password!==""){
      loggedInMember.password = request.body.password;
    }
    if(request.body.address!==""){
      loggedInMember.address = request.body.address;
    }
    if(request.body.gender!==""){
      loggedInMember.gender = request.body.gender;
    }
    if(request.body.height!==""){
      loggedInMember.height = request.body.height;
    }
    if(request.body.startWeight!==""){
      loggedInMember.startWeight = request.body.startWeight;
    }
    logger.debug("Updating existing member", loggedInMember);
    logger.info(`Updated ${loggedInMember.name}`);
    memberStore.updateMember(memberId);
    response.redirect("/settings/"+memberId);
  }
  
};

module.exports = member;