const db = require("../models");

const User = db.user;
const Group = db.group; 
const Issue = db.issue; 
const Call = db.call;

exports.createIssue = (req, res) => {
    if (!req.body.target) {
        Issue.create({
            name: req.body.name
        })
          .then(issue => {
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                user.addIssues(issue).then(() => {
                    res.send({ message: `Successfully added ${issue.name} to ${user.username}'s issues.` });
                })
            })
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
    } else {
        Group.findOne({
            where: {
                id: req.body.target
            }
        }).then(group => {
            if (!group) {
                Call.findOne({
                    where: {
                        id: req.body.target
                    }
                }).then(call => {
                    call.getUsers().then(users => {
                        if (users.some(user => user.id === req.params.id)) {
                            Issue.create({
                                name: req.body.name
                            }).then(issue => {
                                call.addIssues(issue).then(() => {
                                    res.send({ message: `Successfully added ${issue.name} to ${call.title}'s issues.` });
                                })
                            })
                        } else {
                            res.send({ message: 'Users can only update their own calls.' });
                        }
                    })
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                 });
            } else {
                group.getUsers().then(users => {
                    if (users.some(user => user.id === req.params.id)) {
                        Issue.create({
                            name: req.body.name
                        }).then(issue => {
                            group.addIssues(issue).then(() => {
                                res.send({ message: `Successfully added ${issue.name} to ${group.title}'s issues.` });
                            })
                        })
                    } else {
                        res.send({ message: 'Must be a member to update group.' });
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }
        })
    }
};

exports.addIssue = (req, res) => {
    Issue.findOne({
        where: {
            id: req.body.issueId
        }
    })
      .then(issue => {
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (!req.body.target) {
                user.addIssues(issue).then(() => {
                    res.send({ message: `Successfully added ${issue.name} to ${user.username}'s issues.` });
                })
            } else {
                Call.findOne({
                    where: {
                        id: req.body.target
                    }
                }).then(call => {
                    if (!call) {
                        Group.findOne({
                            where: {
                                id: req.body.target
                            }
                        }).then(group => {
                            group.getUsers().then(users => {
                                if (users.some(user => user.id === req.params.id)) {
                                    group.addIssues(issue).then(() => {
                                        res.send({ message: `Successfully added ${issue.name} to ${group.title}'s issues.` });
                                    })
                                } else {
                                    res.send({ message: 'Must be a member to update group.' });
                                }
                            })
                        })
                    } else {
                        call.getUsers().then(users => {
                            if (users.some(user => user.id === req.params.id)) {
                                call.addIssues(issue).then(() => {
                                    res.send({ message: `Successfully added ${issue.name} to ${call.title}'s issues.` });
                                })
                            } else {
                                res.send({ message: 'Users can only update their own calls.' });
                            }
                        })
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.removeIssue = (req, res) => {
    Issue.findOne({
        where: {
            id: req.body.issueId
        }
    })
      .then(issue => {
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (!req.body.target) {
                user.removeIssues(issue).then(() => {
                    res.send({ message: `Successfully removed ${issue.name} from ${user.username}'s issues.` });
                })
            } else {
                Call.findOne({
                    where: {
                        id: req.body.target
                    }
                }).then(call => {
                    if (!call) {
                        Group.findOne({
                            where: {
                                id: req.body.target
                            }
                        }).then(group => {
                            group.getUsers().then(users => {
                                if (users.some(user => user.id === req.params.id)) {
                                    group.removeIssues(issue).then(() => {
                                        res.send({ message: `Successfully removed ${issue.name} from ${group.title}'s issues.` });
                                    })
                                } else {
                                    res.send({ message: 'Must be a member to update group.' });
                                }
                            })
                        })
                    } else {
                        call.getUsers().then(users => {
                            if (users.some(user => user.id === req.params.id)) {
                                call.removeIssues(issue).then(() => {
                                    res.send({ message: `Successfully removed ${issue.name} from ${call.title}'s issues.` });
                                })
                            } else {
                                res.send({ message: 'Users can only update their own calls.' });
                            }
                        })
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.getIssues = (req, res) => {
    Issue.findAll()
        .then(issues => {
            res.send(issues);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getOneIssue = (req, res) => {
    Issue.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(issue => {
            res.send(issue);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getIssuesOf = (req, res) => {
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
                Call.findOne({
                    where: {
                        id: req.params.id
                    }
                }).then(call => {
                    var callissues = [];
                    call.getIssues().then(issues => {
                        for (let i = 0; i < issues.length; i++) {
                            callissues.push({
                                issueId: issues[i].id,
                                name: issues[i].name
                            });
                        }
                        res.status(200).send({ 
                            callissues: callissues
                        });
                    });
                })
              } else {
                var groupissues = [];
                group.getIssues().then(issues => {
                  for (let i = 0; i < issues.length; i++) {
                    groupissues.push({
                        issueId: issues[i].id,
                        name: issues[i].name
                      });
                  }
                  res.status(200).send({ 
                    groupissues: groupissues
                  });
                });
              }
          })
      } else {
        var userissues = [];
        user.getIssues().then(issues => {
          for (let i = 0; i < issues.length; i++) {
            userissues.push({
                issueId: issues[i].id,
                name: issues[i].name
              });
          }
          res.status(200).send({ 
            userissues: userissues
          });
        });
      }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};