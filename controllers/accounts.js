"use strict";

const memberStore = require("../models/member-store");
const trainerStore = require("../models/trainer-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("assessment", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    const trainer = trainerStore.getTrainerByEmail(request.body.email);
    const password = request.body.password;
    if (member && member.password===password) {
      response.cookie("assessment", member.email);
      logger.info(`logging in ${member.email} `+ member.email);
      response.redirect("/dashboard");
    } 
    else if (trainer && trainer.password===password) {
      const trainerId = request.params.id;
      response.cookie("assessment", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainer");
    } 
    
    else {
      response.redirect("/login");
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.assessment;
    return memberStore.getMemberByEmail(memberEmail);
  },
  
    
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.assessment;
    return trainerStore.getTrainerByEmail(trainerEmail);
  },
  
  settings(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Settings",
      member: memberStore.getMemberById(loggedInMember.id)
    };
    response.render("settings", viewData);
  },
    
};

module.exports = accounts;