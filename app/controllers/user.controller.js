const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.userData = (req, res) => {
    User.findOne({
        where: {
          id: req.params.id
        }
    })
        .then(user => {
            if (!user) {
            return res.status(404).send({ message: "User Not found." });
            }
            res.status(200).send({ 
                id: user.id,
                username: user.username,
                email: user.email,
                location: user.location,
                bio: user.bio
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};