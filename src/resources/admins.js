const express = require('express');

const router = express.Router();
const fs = require('fs');
const admins = require('../data/admins.json');

module.exports = router;

router.post('/add', (req, res) => {
  const adminParam = req.body;
  const newAdmin = {
    id: adminParam.id = new Date().getTime().toString().substring(6),
    first_name: adminParam.first_name ?? 'name undefined',
    last_name: adminParam.last_name ?? 'last name undefined',
    email: adminParam.email ?? 'email undefined',
    password: adminParam.password ?? 'password undefined',
    create_employee_id: adminParam.create_employee_id ?? 'not employees created',
    delete_employee_id: adminParam.delete_employee_id ?? 'not employees delete',
    edit_employee_id: adminParam.edit_employee_id ?? 'not employees edited',
  };
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Cannot create new Admin');
    } else {
      res.send('Admin created successfully');
    }
  });
});

router.put('/edit', (req, res) => {
  const editAdmin = req.body;
  const adminId = editAdmin.id;
  const adminIndex = admins.map((index) => index.id).indexOf(adminId);
  if (adminIndex === -1) {
    res.send('Admin not found');
  } else if (JSON.stringify(admins[adminIndex]) === JSON.stringify(editAdmin)) {
    res.send('Admin not have data to change');
  } else {
    if (admins[adminIndex].first_name !== editAdmin.first_name) {
      admins[adminIndex].first_name = editAdmin.first_name;
    }
    if (admins[adminIndex].last_name !== editAdmin.last_name) {
      admins[adminIndex].last_name = editAdmin.last_name;
    }
    if (admins[adminIndex].email !== editAdmin.email) {
      admins[adminIndex].email = editAdmin.email;
    }
    if (admins[adminIndex].password !== editAdmin.password) {
      admins[adminIndex].password = editAdmin.password;
    }
    if (admins[adminIndex].create_employee_id !== editAdmin.create_employee_id) {
      admins[adminIndex].create_employee_id = editAdmin.create_employee_id;
    }
    if (admins[adminIndex].delete_employee_id !== editAdmin.delete_employee_id) {
      admins[adminIndex].delete_employee_id = editAdmin.delete_employee_id;
    }
    if (admins[adminIndex].edit_employee_id !== editAdmin.edit_employee_id) {
      admins[adminIndex].edit_employee_id = editAdmin.edit_employee_id;
    }
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
      if (err) {
        res.send('Cannot edit Admin');
      } else {
        res.send('Admin edited successfully');
      }
    });
  }
});
