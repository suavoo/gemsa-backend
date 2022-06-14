const db = require("../models");

const User = db.user;
const Group = db.group;
const Message = db.message;
const Call = db.call;

exports.createGroup = (req, res) => {
    Group.create({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description, 
        image: req.body.image
    })
      .then(group => {
          User.findOne({
              where: {
                  id: req.params.id
              }
          }).then(user => {
            group.setUsers([user]).then(() => {
                res.send(group);
            })
          })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.updateGroup = (req, res) => {
    Group.findOne({
        where: {
            id: req.body.groupId 
        }
    })
      .then(group => {
          group.getUsers().then(users => {
              if (users.some(user => user.id === req.params.id)) {
                group.update({
                    title: req.body.title,
                    location: req.body.location,
                    description: req.body.description,
                    image: req.body.image
                }).then(() => {
                   res.send(group);
                })
              } else {
                  res.send({ message: 'Must be member to update.' })
              }
          })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.enterGroup = (req, res) => {
    Group.findOne({
        where: {
            id: req.body.groupId
        }
    })
      .then(group => {
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
          group.addUsers(user).then(() => {
              res.send({ message: `${user.username} is now a member of ${group.title}` });
          })
        })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.leaveGroup = (req, res) => {
    Group.findOne({
        where: {
            id: req.body.groupId
        }
    })
      .then(group => {
            group.getUsers().then(users => {
                if (users.length === 1) {
                    group.destroy().then(() => {
                        res.send({ message: `Group was deleted` });
                    })
                } else {
                    User.findOne({
                        where: {
                            id: req.params.id
                        }
                    }).then(user => {
                        group.removeUsers(user).then(() => {
                            res.send({ message: `${user.username} has left ${group.title}` });
                        })
                    })
                }
            })
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.getGroups = (req, res) => {
    Group.findAll()
        .then(groups => {
            res.send(groups);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getOneGroup = (req, res) => {
    Group.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(group => {
            res.send(group);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getGroupUsers = (req, res) => {
    Group.findOne({
        where: {
            id: req.params.id
        }
    })
      .then(group => {
          var members = [];
          group.getUsers().then(users => {
            for (let i = 0; i < users.length; i++) {
              members.push({
                  userId: users[i].id,
                  username: users[i].username,
                  location: users[i].location,
                  bio: users[i].bio,
                  avatar: users[i].avatar
                });
            }
            res.status(200).send({ 
              groupmembers: members
            });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getGroupCalls = (req, res) => {
    Call.findAll({
        where: {
            group: req.params.id
        }
    })
      .then(calls => {
        res.send(calls);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.getGroupMessages = (req, res) => {
    Message.findAll({
        where: {
            otherId: req.params.id
        }
    })
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

