"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const accounts = require("../controllers/accounts.js");

const bmi = {
  BMICalculation(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    if(assessments.length===0) {
      return member.startWeight / Math.pow(member.height, 2);
    }
    else{
      return assessments[assessments.length-1].weight / Math.pow(member.height, 2);
    }
  }
}

module.exports = bmi;