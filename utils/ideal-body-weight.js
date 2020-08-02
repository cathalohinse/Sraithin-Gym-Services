"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const accounts = require("../controllers/accounts.js");
const BMI = require("./bmi.js")    

const idealBodyWeight = {  
  isIdealBodyWeight(id){
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    if(assessments.length===0){
      return "No Assessments have been made";
    }
    else {
      const assessment = assessments[(assessments.length)-1];
      let isIdealBodyWeight;
      if (member.gender ==="M" || member.gender ==="m"  || member.gender ==="Male"  || member.gender ==="male" ) {
        let idealWeight = 50.0 + (2.3 * ((member.height - 1.524) / 0.0254));
        if (member.height <= 1.524 && Math.abs(assessment.weight - 50.0) <= 0.2) {
          isIdealBodyWeight = true;
        }
        else if (member.height > 1.524 && Math.abs(assessment.weight - idealWeight) <= 0.2) {
          isIdealBodyWeight = true;
        }
        else {
          isIdealBodyWeight = false;
        }
      }
      else {
        let idealWeight = 45.5 + (2.3 * ((member.height - 1.524) / 0.0254));
        if (member.height <= 1.524 && Math.abs(assessment.weight - 45.5) <= 0.2) {
          isIdealBodyWeight = true;
        }
        else if (member.height > 1.524 && Math.abs(assessment.weight - idealWeight) <= 0.4) {
          isIdealBodyWeight = true;
        }
        else {
          isIdealBodyWeight = false;
        }
      }
      if (isIdealBodyWeight) {
        return true;
      }
      else {
        return false;
      }
    }
  }  
}

module.exports = idealBodyWeight;