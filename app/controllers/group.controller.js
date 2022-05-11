const db = require("../models");

const User = db.user;
const Group = db.group;

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
                res.send({ message: "User successfully created Group!" });
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
          group.update({
              title: req.body.title,
              location: req.body.location,
              description: req.body.description,
              image: req.body.image
          }).then(() => {
             res.send({ message: `${group.title} has been updated` });
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

exports.deleteGroup = (req, res) => {
    Group.destroy({
        where: {
            id: req.body.groupId
        }
    })
      .then(
          res.send({ message: 'Group was deleted.' })
      )
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

