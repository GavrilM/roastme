const express = require("express")
const Roast = require("mongoose").model("Roast")

module.exports.create = function(req, res){
    const roast = new Roast(req.body)
    Roast.save((err) => {
        if(err)
            res.status(400).send(err)
        else
            res.json(roast)
    })
}

module.exports.getRoast = function(req,res){
    Roast.findOne(req.body, (err, res) => {
        if(err)
            res.status(400).send(err)
        else
            res.json(res)
    })
}

module.exports.sanitize = function(req,res,next){
    if(!req.body.text){
        res.status(400).send({
            error: 'No text!'
        })
    }
    else{
        req.body.text = sanitize(req.body.text)
        next();
    }
}

function sanitize(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}