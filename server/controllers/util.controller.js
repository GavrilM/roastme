const express = require("express")
const Invitee = require("../models/invitee")

module.exports.create = function(res, req){
    const invitee = new Invitee(res.body)
    invitee.save((err) => {
    	if(err){
			console.log(err)
			res.status(400).send(err)
		} 
		else{
			res.send(`Invitation for ${res.body.name} successfully sent ${res.body.email}.`)
		}
    })
}