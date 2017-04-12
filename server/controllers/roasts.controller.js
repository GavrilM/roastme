const express = require("express")
const mongoose = require("mongoose")
const Roast = mongoose.model("Roast")

module.exports.create = function(data, fn){
    const roast = new Roast(sanitize(data))
    return roast.save((err) => {
        if(err)
            fn(null)
        else
            fn(roast)
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

module.exports.feed = function(type,id) {
    return Roast.find({
        "location.where": type,
        "location.id": type === 'group' ? mongoose.Types.ObjectId(id) : id
    }).sort({
        createdAt: -1
    })
}

module.exports.vote = function(roast, userId){
    return Roast.update({
        _id: roast._id,
        upvoted: {
            $nin: [userId]
        },
        downvoted: {
            $nin: [userId]
        }
    }, {
        upvoted: roast.upvoted,
        downvoted: roast.downvoted,
        upvotes: roast.upvotes
    })
}

module.exports.remove = function(roast){
    return Roast.remove({
        _id: roast._id
    }, (err,res) => {
        return err ? console.log(err) : res
    })
}

function sanitize(roast){
    roast.content = roast.content
    return roast
}

// function sanitize(req,res,next){
//     let str = req.body.content
//     str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
//     req.body.content = str.trim();
//     next()
// }