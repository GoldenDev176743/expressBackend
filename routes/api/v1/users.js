const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.get('/', async (req,res) => {
  // const data =await User.find();
  // res.json(data);
  // res.send(User);
  try {
    const persons = await User.find();
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, age, visits, status, progress } = req.body;
 // alert(id);
  User.findByIdAndUpdate(id, {  firstName, lastName, email, age, visits, status, progress }, { new: true })
      .then((updatedData) => res.json(updatedData))
      .catch((err) => {
        User.findById(id).then(r => res.status(400).json({ ...r, error: err }));
      });
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, age, visits, status, progress } = req.body;

  const newData = new User({ firstName, lastName, email, age, visits, status, progress  });

  newData.save()
    .then(savedData => res.json(savedData))
    .catch(err => res.status(400).json(err));
});

router.delete('/:id', async (req, res) => {
  try {
    const auser = await User.findById(req.params.id);

    if (!auser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check user
    // if (User.auser.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'User not authorized' });
    // }

    //await auser.remove();
    const query = { id : req.params.id };
    const result = await auser.deleteOne(query);

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('del-Server Error');
  }
});

// router.post(
//   '/',
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//      // const user = await User.findById(req.user.id).select('-password');

//       const newUser = new Post({
//         firstName: req.body.firstName,
//         age: req.body.age
//       });

//       const post = await newUser.save();

//       res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );


// router.post(
//   '/',
//   check('name', 'Name is required').notEmpty(),
//   check('email', 'Please include a valid email').isEmail(),
//   check(
//     'password',
//     'Please enter a password with 6 or more characters'
//   ).isLength({ min: 6 }),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;

//     try {
//       let user = await User.findOne({ email });

//       if (user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'User already exists' }] });
//       }

//       const avatar = normalize(
//         gravatar.url(email, {
//           s: '200',
//           r: 'pg',
//           d: 'mm'
//         }),
//         { forceHttps: true }
//       );

//       user = new User({
//         name,
//         email,
//         avatar,
//         password
//       });

//       const salt = await bcrypt.genSalt(10);

//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       const payload = {
//         user: {
//           id: user.id
//         }
//       };

//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         { expiresIn: '5 days' },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

module.exports = router;
