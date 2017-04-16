const vars = require("../config/vars")

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: vars.emailCred
}, {
	from : vars.emailCred.user
})

const url = 'http://localhost:8080'

const invite = (user, invitee) => `
<!DOCTYPE html>
<html >
	<head>
		<meta charset="UTF-8">
		<title>Email Template</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato|Poppins">
	</head>

	<body>
		<div style="height:100%; width:100%;">
			<h1 style="font-family:'Poppins', Helvetica; font-size: 2.5em; margin:25px auto;">Welcome to Roast Club</h1>
			<p style="font-family:'Poppins', Arial; font-size: 1.5em;">
				Hey ${invitee.name.substr(0,invitee.name.indexOf(' '))}, you have been invited by ${user.displayName}. 
				<a href="${url}/confirm?code=${invitee.confirmCode}">Click here</a>
				to sign in or go to ${url} and enter code ${invitee.confirmCode} to sign up.
			</p>
		</div>
	</body>
</html>`


module.exports.invite = function(user, invitee){
	transport.sendMail({
		to: invitee.email,
		subject: `${user.displayName} has invited you to join Fite Club`,
		text: 'Head over to fiteclub.com and sign up with access code ' + invitee.confirmCode,
		html: invite(user, invitee)
	})
}