const db = require("../models");

const User = db.user;
const Call = db.call;
const Skill = db.skill;

exports.createSkill = (req, res) => {
    if (!req.body.target) {
        Skill.create({
            name: req.body.name
        }).then(skill => {
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                user.addSkills(skill).then(() => {
                    res.send({ message: `Successfully added ${skill.name} to ${user.username}'s skills.` });
                })
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    } else {
        Call.findOne({
            where: {
                id: req.body.target
            }
        }).then(call => {
            call.getUsers().then(users => {
                if (users.some(user => user.id === req.params.id)) {
                    Skill.create({
                        name: req.body.name
                    }).then(skill => {
                        call.addSkills(skill).then(() => {
                            res.send({ message: `Successfully added ${skill.name} to ${call.title}'s skills.` });
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
    }
};

exports.addSkill = (req, res) => {
    Skill.findOne({
        where: {
            id: req.body.skillId
        }
    })
      .then(skill => {
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (!req.body.target) {
                user.addSkills(skill).then(() => {
                    res.send({ message: `Successfully added ${skill.name} to ${user.username}'s skills.` });
                })
            } else {
                Call.findOne({
                    where: {
                        id: req.body.target
                    }
                }).then(call => {
                    call.getUsers().then(users => {
                        if (users.some(user => user.id === req.params.id)) {
                            call.addSkills(skill).then(() => {
                                res.send({ message: `Successfully added ${skill.name} to ${call.title}'s skills.` });
                            })
                        } else {
                            res.send({ message: 'Users can only update their own calls.' });
                        }
                    })
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

exports.removeSkill = (req, res) => {
    Skill.findOne({
        where: {
            id: req.body.skillId
        }
    })
      .then(skill => {
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (!req.body.target) {
                user.removeSkills(skill).then(() => {
                    res.send({ message: `Successfully removed ${skill.name} from ${user.username}'s skills.` });
                })
            } else {
                Call.findOne({
                    where: {
                        id: req.body.target
                    }
                }).then(call => {
                    call.getUsers().then(users => {
                        if (users.some(user => user.id === req.params.id)) {
                            call.removeSkills(skill).then(() => {
                                res.send({ message: `Successfully removed ${skill.name} from ${call.title}'s skills.` });
                            })
                        } else {
                            res.send({ message: 'Users can only update their own calls.' });
                        }
                    })
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

exports.getSkills = (req, res) => {
    Skill.findAll()
        .then(skills => {
            res.send(skills);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getOneSkill = (req, res) => {
    Skill.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(skill => {
            res.send(skill);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getSkillsOf = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (!user) {
            Call.findOne({
                where: {
                    id: req.params.id
                }
            }).then(call => {
                var callskills = [];
                call.getSkills().then(skills => {
                    for (let i = 0; i < skills.length; i++) {
                        callskills.push({
                            skillId: skills[i].id,
                            name: skills[i].name
                        });
                    }
                    res.status(200).send({ 
                        callskills: callskills
                    });
                });
            })
        } else {
            var userskills = [];
            user.getSkills().then(skills => {
                for (let i = 0; i < skills.length; i++) {
                    userskills.push({
                        skillId: skills[i].id,
                        name: skills[i].name
                    });
                }
                res.status(200).send({ 
                    userskills: userskills
                });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};