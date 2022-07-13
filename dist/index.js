"use strict";

var _emailjs = require("emailjs");

const {
  MailListener
} = require("mail-listener5"); // NOTE: A FUTURE VERSION (release date TBA) will not require ES6 destructuring or referring to the class after the require statement (i.e. require('mail-listener5').MailListener). At this stage, this is necessary because index.js exports the MailListener class as a property of module.exports.


const mailListener = new MailListener({
  username: 'testsmtptt@gmail.com',
  password: 'jfxlgoeflkjnptjf',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  },
  connTimeout: 10000,
  // Default by node-imap
  authTimeout: 5000,
  // Default by node-imap,
  debug: console.log,
  // Or your custom function with only one incoming argument. Default: null
  mailbox: "INBOX",
  // mailbox to monitor
  searchFilter: ['UNSEEN', ['SINCE', 'Jul 08, 2022']],
  // the search filter being used after an IDLE notification has been retrieved
  markSeen: true // all fetched email willbe marked as seen and not fetched next time
  // fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  // attachments: true, // download attachments as they are encountered to the project directory
  // attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments

});
mailListener.start(); // start listening
// stop listening
//mailListener.stop();

mailListener.on("server:connected", function () {
  console.log("imapConnected");
});
mailListener.on("mailbox", function (mailbox) {
  console.log("Total number of mails: ", mailbox.messages.total); // this field in mailbox gives the total number of emails
});
mailListener.on("server:disconnected", function () {
  console.log("imapDisconnected");
});
mailListener.on("error", function (err) {
  console.log(err);
});
mailListener.on("headers", function (headers, seqno) {// do something with mail headers
});
mailListener.on("body", function (body, seqno) {// do something with mail body
});
mailListener.on("attachment", function (attachment, path, seqno) {// do something with attachment
});
mailListener.on("mail", function (mail, seqno) {
  // do something with the whole email as a single object
  const to = mail.to.value;
  processReceivedEmail(mail); // if(to.map(x => x.address).some(x => /^rfq.*$/.test(x))) {
  // processReceivedEmail(mail);
  // }
});

const processReceivedEmail = mail => {
  const messageId = mail.messageId;
  const from = mail.from.value;
  const to = mail.to.value;
  const subject = mail.subject;
  const html = mail.html;
  const text = mail.text;
  const date = mail.headers.date;
  console.log('RECEIVED EMAIL START------------------------------->>>>>>>>>>');
  console.log('messageId', messageId);
  console.log('from', JSON.stringify(from, null, 2));
  console.log('to', JSON.stringify(to, null, 2));
  console.log('subject', subject);
  console.log('text', text);
  console.log('date', date);
  console.log('RECEIVED EMAIL END------------------------------->>>>>>>>>>');
};