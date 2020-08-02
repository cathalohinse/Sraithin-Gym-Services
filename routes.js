~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const trainer = require("./controllers/trainer.js");
const member = require("./controllers/member.js");
const assessment = require("./controllers/assessment.js");

router.get("/", accounts.index);
router.get("/signup", accounts.signup);
router.get("/login", accounts.login);
router.get("/logout", accounts.logout);
router.get("/about", about.index);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.get("/trainermember/:id", trainer.trainerMember);
router.get("/dashboard", dashboard.index);
router.get("/settings/:id", accounts.settings);
router.get("/trainer", trainer.index);
router.get("/assessment/:id", assessment.index);
router.post("/member/:id/addassessment", member.addAssessment);
router.get("/member/deleteassessment/:id", member.deleteAssessment);
router.post("/member/updatemember/:id", member.updateMember);
router.get("/trainer/deletemember/:id", trainer.deleteMember);
router.get("/trainer/trainermember/:id", trainer.trainerMember);
router.post("/trainer/:memberid/addcomment/:id", trainer.addComment);

module.exports = router;