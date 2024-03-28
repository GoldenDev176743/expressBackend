const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Store = require('../../../models/Store');

router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    name,
    type,
    manager,
    cannabisLicense,
    phone,
    email,
    website,
    registerDate,
    address,
    city,
    zipCode,
    timeZone,
    status,
    state
  } = req.body;
  // alert(id);
  Store.findByIdAndUpdate(id, {
    name,
    type,
    manager,
    cannabisLicense,
    phone,
    email,
    website,
    registerDate,
    address,
    city,
    zipCode,
    timeZone,
    status,
    state
  }, { new: true })
    .then((updatedData) => res.json(updatedData))
    .catch((err) => {
      Store.findById(id).then(r => res.status(400).json({ ...r, error: err }));
    });
});

router.post('/', (req, res) => {
  const {
    name,
    type,
    manager,
    cannabisLicense,
    phone,
    email,
    website,
    registerDate,
    address,
    city,
    zipCode,
    timeZone,
    status,
    state
  } = req.body;

  const newData = new Store(
    {
      name,
      type,
      manager,
      cannabisLicense,
      phone,
      email,
      website,
      registerDate,
      address,
      city,
      zipCode,
      timeZone,
      status,
      state
    }
  );

  newData.save()
    .then(savedData => res.json(savedData))
    .catch(err => res.status(400).json(err));
});

router.delete('/:id', async (req, res) => {
  try {
    const astore = await Store.findById(req.params.id);

    if (!astore) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    // Check user
    // if (User.auser.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'User not authorized' });
    // }

    //await auser.remove();
    const query = { id: req.params.id };
    const result = await astore.deleteOne(query);

    res.json({ msg: 'Store removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('del-Server Error');
  }
});

module.exports = router;
