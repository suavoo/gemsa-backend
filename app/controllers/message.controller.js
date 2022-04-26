const db = require("../models");

const User = db.user;
const Message = db.message;

exports.createMessage = (req, res) => {
    Message.create({
        userId: req.body.userId,
        otherId: req.body.otherId,
        text: req.body.text
    })
      .then(message => {
          User.findOne({
              where: {
                  id: message.userId
              }
          }).then(user => {
              res.send({ message: `${user.username} said: ${message.text}` })
          })
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

exports.getMessagesFrom = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
      .then(user => {
          if (!user) {
            Message.findAll({
                where: {
                    otherId: req.params.id
                }
            }).then(messages => {
                res.send(messages);
            })
          } else {
              Message.findAll({
                  where: {
                      userId: user.id
                  }
              }).then(messages => {
                res.send(messages);
              })
          }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};