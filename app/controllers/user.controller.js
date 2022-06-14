const db = require("../models");
const User = db.user;
const Message = db.message;

// Controllers preparing for sending specific content depending on user roles in the future
   
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

// Get details for specific user

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

// Get groups specific user belongs to

exports.getUserGroups = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
      .then(user => {
          var memberof = [];
          user.getGroups().then(groups => {
            for (let i = 0; i < groups.length; i++) {
              memberof.push({
                  groupId: groups[i].id,
                  title: groups[i].title,
                  location: groups[i].location,
                  description: groups[i].description,
                  image: groups[i].image
                });
            }
            res.status(200).send({ 
              usergroups: memberof
            });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Get calls of specific user

exports.getUserCalls = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
          var usercalls = [];
          user.getCalls().then(calls => {
            for (let i = 0; i < calls.length; i++) {
              usercalls.push({
                  callId: calls[i].id,
                  title: calls[i].title
                });
            }
            res.status(200).send({ 
              usercalls: usercalls
            });
          });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Get messages of specific user, only accessable to this specific user when logged in

exports.getUserMessages = (req, res) => {
    Message.findAll({
        where: {
            userId: req.params.id
        }
    })
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};