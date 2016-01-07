var nodemailer = require('nodemailer');

function Envoyeur_mail(){};

var smtpConfig = {
  host: 'localhost',
  port: 465,
  secure: true, // use SSL
  auth: {
        user: 'user@gmail.com',
        pass: 'pass'
    }
}

Envoyeur_mail.prototype.transporter = nodemailer.createTransport(smtpConfig);

Envoyeur_mail.prototype.envoyer_mail = function(destinataire){
  var mailOptions = {
          from: 'bonjour',
          to: destinataire,
          subject: "Signe ton contrat!",
          text: "Salut, tu peux signer"
          html: '<b>' + "version html du mail" + '</b>'
  };
 this.transporter.sendMail(mailOptions, function(error, info){
      if(error){
         return console.log(error);
      }
      console.log('Message sent: ' + info.response);
 });
