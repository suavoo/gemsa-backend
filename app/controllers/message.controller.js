const db = require("../models");

const User = db.user;
const Message = db.message;
const Group = db.group;
const Call = db.call;

exports.createMessage = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
      .then(user => {
          if (!req.body.otherId) {
            Message.create({
                userId: req.params.id,
                otherId: req.body.otherId,
                text: req.body.text
            }).then(message => {
                res.send({ message: `${user.username} said: ${message.text}` })
            })
          } else {
            Group.findOne({
                where: {
                    id: req.body.otherId
                }
            }).then(group => {
                if (!group) {
                    Call.findOne({
                        where: {
                            id: req.body.otherId
                        }
                    }).then(call => {
                        if (!call) {
                            res.send({ message: 'No Group or Call found.' })
                        } else {
                            Message.create({
                                userId: req.params.id,
                                otherId: req.body.otherId,
                                text: req.body.text
                            }).then(message => {
                                res.send({ message: `${user.username} said: ${message.text}` })
                            })
                        }
                    })
                } else {
                    group.getUsers().then(users => {
                        if (users.some(user => user.id === req.params.id)) {
                            Message.create({
                                userId: req.params.id,
                                otherId: req.body.otherId,
                                text: req.body.text
                            }).then(message => {
                                res.send({ message: `${user.username} said: ${message.text}` })
                            })
                        } else {
                            res.send({ message: 'Only members can message the group.' })
                        }
                    })
                }
            })
          }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.deleteMessage = (req, res) => {
    Message.findOne({
        where: {
            id: req.body.messageId 
        }
    })
      .then(message => {
          User.findOne({
              where: {
                  id: req.params.id
              }
          }).then(user => {
              if (user.id === message.userId) {
                  message.destroy().then(() => {
                      res.send({ message: 'Message deleted!' })
                  })
              } else {
                  res.send({ message: 'Not your message to delete!' });
              }
          })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      }); 
};

