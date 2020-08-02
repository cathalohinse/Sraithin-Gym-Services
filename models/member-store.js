"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const memberStore = {
  store: new JsonStore("./models/member-store.json", { members: [] }),
  collection: "members",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },
  
  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },
  
  updateMember(id){
    const member = this.getMember(id);
    this.store.update(this.collection, id, member);
    this.store.save();
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getMemberByAssessmentId(id){
    return this.store.findOneBy(this.collection, {id: id});
  },
  
  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

};

module.exports = memberStore;