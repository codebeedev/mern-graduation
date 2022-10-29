const { Router } = require("express");
const MailerControllers = require("../controllers/mailer/mailer");
const mailerRouter = Router();

mailerRouter.post("/", MailerControllers.sendmail);

module.exports = mailerRouter;
