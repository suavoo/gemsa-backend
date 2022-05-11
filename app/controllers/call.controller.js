const db = require("../models");

const User = db.user;
const Group = db.group;
const Call = db.call; 

exports.createCall = (req, res) => {
    Call.create({
        title: req.body.title,
        location: req.body.location,
        time: req.body.time,
        contactinfo: req.body.contactinfo,
        description: req.body.description,
        image: req.body.image
    })
        .then(call => {
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                if (!user) {
                    Group.findOne({
                        where: {
                            id: req.params.id
                        }
                    }).then(group => {
                        if (!group) {
                            res.send({ message: 'No such User or Group' });
                        } else {
                            group.addCalls(call).then(() => {
                                res.send({ message: `${group.title} called for ${call.title}` });
                            })
                        }
                    })
                } else {
                    user.addCalls(call).then(() => {
                        res.send({ message: `${user.username} called for ${call.title}` });
                    })
                }
            })
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.deleteCall = (req, res) => {
    Call.destroy({
        where: {
            id: req.body.callId
        }
    })
      .then(
          res.send({ message: 'Call was deleted.' })
      )
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
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                if (!user) {
                    Group.findOne({
                        where: {
                            id: req.params.id
                        }
                    }).then(group => {
                        if (!group) {
                            res.send({ message: 'No such User or Group' });
                        } else {
                            call.update({
                                title: req.body.title,
                                location: req.body.location,
                                time: req.body.time,
                                contactinfo: req.body.contactinfo,
                                description: req.body.description,
                                image: req.body.image
                            }).then(() => {
                               res.send({ message: `${call.title} has been updated by ${group.title}` });
                            })
                        }
                    })
                } else {
                    call.update({
                        title: req.body.title,
                        location: req.body.location,
                        time: req.body.time,
                        contactinfo: req.body.contactinfo,
                        description: req.body.description,
                        image: req.body.image
                    }).then(() => {
                       res.send({ message: `${call.title} has been updated by ${user.username}` });
                    })
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

exports.getCallsOf = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (!user) {
            Group.findOne({
                where: {
                    id: req.params.id
                }
            }).then(group => {
                if (!group) {
                    res.send({ message: 'No such User or Group' });
                } else {
                  var groupcalls = [];
                  group.getCalls().then(calls => {
                    for (let i = 0; i < calls.length; i++) {
                      groupcalls.push({
                          callId: calls[i].id,
                          title: calls[i].title
                        });
                    }
                    res.status(200).send({ 
                      groupcalls: groupcalls
                    });
                  });
                }
            })
        } else {
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
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

