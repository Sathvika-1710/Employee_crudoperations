const express = require('express');
const { append } = require('express/lib/response');
const fs = require('fs')
const mongoose = require('mongoose');
const Employee = mongoose.model('Employees')
var db = require('../models/db')
var router = express.Router();
router.get('/', (req, res) => {
    res.render('home', {
        heading: 'INSERT EMPLOYEE'
    })
})
router.get('/employee/list', (req, res) => {
    Employee.find({}, function (err, users) {
        if (err) {
            res.send(err);
            return;
        }
        res.render('list', {
            list: users
        })

    });

})
router.get('/employee/list/:name', (req, res) => {
    Employee.find({ fullname: req.params.name }, function (err, users) {
        if (err) {
            res.send(err);
            return;
        }
        res.render('list', {
            list: users
        })
    });

})

router.post('/employee', (req, res) => {
    if (req.body._id == '') {
        var arr;
        Employee.find({ fullname: req.body.name }, (err, users) => {
            if (!err) {
                var len = Object.keys(users).length
                if (len == 0) {
                    Employee.insertMany({
                        fullname: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        city: req.body.city

                    })
                    res.redirect('/employee/list');
                }
                else{
                    res.render('notfou',{
                        mess:"duplicate data"
                    })
                    
                }
            }
        })

    }
    else {
        Employee.findByIdAndUpdate(req.body._id, {
            fullname: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city

        }, { new: true }, (err, data) => {
            if (!err) {
                console.log("data updated succesfully")
            }
            else {
                console.log(err.message);
            }
        });
        res.redirect('/employee/list');
    }

})
router.get('/update/:id', (req, res) => {
    Employee.findById(req.params.id, function (err, users) {
        if (!err) {
            res.render('home', {
                heading: "UPDATE EMPLOYEE",
                employee: users
            })
        }
    })
})
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, data) => {
        if (!err) {
            console.log("data deleted succsfully")
        }
        else {
            console.log(err.message);
        }
    });
    res.redirect('/employee/list');
})

module.exports = router;