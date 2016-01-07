var nodemailer = require('nodemailer');

function Envoyeur_mail(){};

var smtpConfig = {
  host: 'smtp.ghs.fr',
  port: 25,
  secure: false // use ssl
}

Envoyeur_mail.prototype.transporter = nodemailer.createTransport(smtpConfig);

Envoyeur_mail.prototype.envoyer_mail = function(destinataire){
  var mailOptions = {
          from: 'bonjour@ghs.fr',
          to: destinataire,
          subject: "Signe ton contrat!",
          text: "Salut, tu peux signer",
          html: '<b>' + "version html du mail" + '</b>'
  };
 this.transporter.sendMail(mailOptions, function(error, info){
      if(error){
         return console.log(error);
      }
      console.log('Message sent: ' + info.response);
 });
}
 if (require.main === module){
   var a = new Envoyeur_mail();
   a.envoyer_mail("loic@ghs.fr");
 }
