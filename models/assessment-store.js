"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {  assessmentCollection: [] }),
  collection: "assessmentCollection",

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberAssessments(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },
  
  addComment(id, comment) {
    const assessment = this.getAssessment(id);
    assessment.feedback = comment;
    this.store.update(this.collection, id, assessment);
    //assessment.feedback = comment;
    //this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },

  removeAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
  removeAllAssessmentsByMember(memberid) {
    const assessments = this.store.findBy(this.collection, { memberid: memberid });
    this.store.remove(this.collection, assessments);
    this.store.save();
  }
  
};

module.exports = assessmentStore;