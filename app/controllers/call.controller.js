const db = require("../models");

const User = db.user;
const Call = db.call; 
const Comment = db.comment;

exports.createCall = (req, res) => { 
    Call.create({
        title: req.body.title,
        location: req.body.location,
        time: req.body.time,
        contactinfo: req.body.contactinfo,
        description: req.body.description,
        group: req.body.group,
        image: req.body.image
    })
        .then(call => {
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                user.addCalls(call).then(() => {
                    res.send({ message: `${user.username} called for ${call.title}` });
                })
            })
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.deleteCall = (req, res) => {
    Call.findOne({
        where: {
            id: req.body.callId
        }
    })
      .then(call => {
          call.getUsers().then(users => {
              if (users.some(user => user.id === req.params.id)) {
                  Call.destroy({
                      where: {
                          id: req.body.callId
                      }
                  }).then(() => {
                    res.send({ message: 'Call deleted.' });
                  })
              } else {
                  res.send({ message: 'Users can only delete their own calls.' });
              }
          })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.updateCall = (req, res) => {
    Call.findOne({
        where: {
            id: req.body.callId 
        }
    })
        .then(call => {
            call.getUsers().then(users => {
                if (users.some(user => user.id === req.params.id)) {
                    call.update({
                        title: req.body.title,
                        location: req.body.location,
                        time: req.body.time,
                        contactinfo: req.body.contactinfo,
                        description: req.body.description,
                        image: req.body.image
                    }).then(() => {
                       res.send({ message: `${call.title} has been updated.` });
                    })
                } else {
                    res.send({ message: 'Users can only update their own calls.' });
                }
            })
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.getCalls = (req, res) => {
    Call.findAll()
        .then(calls => {
            res.send(calls);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getOneCall = (req, res) => {
    Call.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(call => {
            res.send(call);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getCallComments = (req, res) => { 
    Comment.findAll({
        where: {
            otherId: req.params.id
        }
    })
      .then(comment => {
        res.send(comment);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

