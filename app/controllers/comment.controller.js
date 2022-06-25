const db = require("../models");

const User = db.user;
const Comment = db.comment;
const Group = db.group;
const Call = db.call;

exports.createComment = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
      .then(user => {
          if (!req.body.otherId) {
            Comment.create({
                userId: req.params.id,
                otherId: req.body.otherId,
                text: req.body.text
            }).then(comment => {
                res.send({ message: `${user.username} said: ${comment.text}` })
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
                            Comment.create({
                                userId: req.params.id,
                                otherId: req.body.otherId,
                                text: req.body.text
                            }).then(comment => {
                                res.send({ message: `${user.username} said: ${comment.text}` })
                            })
                        }
                    })
                } else {
                    group.getUsers().then(users => {
                        if (users.some(user => user.id === req.params.id)) {
                            Comment.create({
                                userId: req.params.id,
                                otherId: req.body.otherId,
                                text: req.body.text
                            }).then(comment => {
                                res.send({ message: `${user.username} said: ${comment.text}` })
                            })
                        } else {
                            res.send({ message: 'Only members can comment in the group.' })
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

exports.deleteComment = (req, res) => {
    Comment.findOne({
        where: {
            id: req.body.commentId 
        }
    })
      .then(comment => {
          User.findOne({
              where: {
                  id: req.params.id
              }
          }).then(user => {
              if (user.id === comment.userId) {
                comment.destroy().then(() => {
                      res.send({ message: 'Comment deleted!' })
                  })
              } else {
                  res.send({ message: 'Not your comment to delete!' });
              }
          })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      }); 
};

