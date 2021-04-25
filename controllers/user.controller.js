const User = require('../models/user.model');
const Password = require('../services/password')

// create and save a new user
exports.create = async(req, res) => {
  // validate request
  if(!req.body.user_id) {
      return res.status(400).send({
          errors: [{ message:  "user_id can not be empty" }]
      });
  }
  
  const user = await User.find({user_id: req.body.user_id});
  
  if(user!='') {
      return res.status(404).send({
          errors: [{ message:  "user_id already exist" }]
      });
  }

  const hashed = await Password.toHash(req.body.password);
  // create a user
  const newUser = new User({
      user_id: req.body.user_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: hashed,
      coachmark_visited: req.body.coachmark_visited,
      assessment_complete: req.body.assessment_complete,
      assessment_skipped: req.body.assessment_skipped,
      last_login: req.body.last_login,
  });

  // save user in database
  newUser.save()
  .then(data => {
      res.send(data);
  })
    .catch(err => {
      res.status(500).send({
          errors: [{ message:  err.message || "error while creating user" }]
      });
  });
};



// find a single user by id
exports.findOne = (req, res) => {
  User.findById(req.params.Id)
  .then((user) => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.Id
          });
      }

      res.send(user);
  }).catch((err) => {
      return res.status(500).send({
          message: "error retreiving user with id " + req.params.userId
      });
  });
};



// update a user with id
exports.update = async(req, res) => {
  // validate request
  if(!req.body.user_id) {
      return res.status(400).send({
          message: "user_id can not be empty"
      });
  }

  // find and update user
  const user = await User.findById(req.params.Id);
  
  if(!user) {
      return res.status(404).send({
          message: "user not found with id " + req.params.Id
      });
  }

  const hashed = await Password.toHash(req.body.password);

  user.set({
    user_id: req.body.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: hashed,
    coachmark_visited: req.body.coachmark_visited,
    assessment_complete: req.body.assessment_complete,
    assessment_skipped: req.body.assessment_skipped,
    last_login: req.body.last_login,
  });
  try{
    await user.save();
    res.send(user);
  } catch(err){
      return res.status(500).send({
        message: "error updating user" + err
      });
  }
};




// delete user by id
exports.delete = async(req, res) => {
  // find and delete user
  const user = await User.findById(req.params.Id);
  
  if(!user) {
      return res.status(404).send({
          message: "user not found with id " + req.params.Id
      });
  }

  User.findByIdAndRemove(req.params.Id)
  .then((user) => {
      res.send({message: "user deleted successfully"});
  }).catch((err) => {
      return res.status(500).send({
          message: "error deleting user with id " + req.params.Id
      });
  });
};


