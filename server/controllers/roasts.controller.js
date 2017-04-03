const express = require("express")
const mongoose = require("mongoose")
const Roast = mongoose.model("Roast")

module.exports.create = function(req, res){
    const roast = new Roast(req.body)
    roast.save((err) => {
        if(err)
            res.status(500).send(err)
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

module.exports.feed = function(req,res) {
    console.log(req.params)
    Roast.find({
        "location.where": 'group',
        "location.id": mongoose.Types.ObjectId(req.groupId)
    }).sort({
        createdAt: -1
    }).then(results => {
        res(results)
    }).catch(err => {
        res.status('500').send(err)
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

function sanitize(req,res,next){
    let str = req.body.content
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    req.body.content = str.trim();
    next()
}