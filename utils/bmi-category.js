"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const accounts = require("../controllers/accounts.js");
const BMI = require("./bmi.js");

const BMICategory = {
  BMICategory(id){
    const member = memberStore.getMemberById(id);
    const assessment = assessmentStore.getMemberAssessments(id);
    let bmiCategory = "";
    const bmiValue = BMI.BMICalculation(id);
    if(bmiValue<16){
      bmiCategory = "SEVERELY UNDERWEIGHT";
    }
    else if(bmiValue>=16 && bmiValue<18.5){
      bmiCategory = "UNDERWEIGHT";
    }
    else if(bmiValue>=18.5 && bmiValue<25){
      bmiCategory = "NORMAL";
    }
    else if(bmiValue>=25 && bmiValue<30){
      bmiCategory = "OVERWEIGHT";
    }
    else if(bmiValue>=30 && bmiValue<35){
      bmiCategory = "MODERATELY OBESE";
    }
    else if(bmiValue>=35){
      bmiCategory = "SEVERELY OBESE";
    }
    return bmiCategory;
  }
}


module.exports = BMICategory;