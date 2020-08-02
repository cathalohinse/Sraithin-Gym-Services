"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store");
const uuid = require("uuid");

const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.debug("assessment id = ", assessmentId);
    const viewData = {
      title: "assessment",
      assessment: assessmentStore.getAssessment(assessmentId),
      member: memberStore.getMemberByAssessmentId(assessmentId)
    };
    response.render("assessment", viewData);
  }

};

module.exports = assessment;