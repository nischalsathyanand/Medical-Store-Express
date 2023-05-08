const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');


let Medicine = require('../models/medicine');
// add medicines get
router.get('/add', function(req, res){
    res.render('addmed', {
        title: 'Add Medicines'
    })
});

// add med post
router.post('/add', 
    [
        body('name').notEmpty().withMessage('name is required'),
        body('use').notEmpty().withMessage(' use is required'),
        body('description').notEmpty().withMessage('description is required'),
    ],
    function(req, res){
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('addmed', {
                title: 'Add Medicines',
                errors: errors.array()
            })
        } 
        else {
           
            let medicine = new Medicine();
            medicine.name = req.body.name;
            medicine.use = req.body.use;
            medicine.description = req.body.description;
            medicine.save(function(err){
                if(err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Article Added')
                    res.redirect('/');
                }
            });


        }
});






//view medicines 
router.get('/:id', function(req, res){
    Medicine.findById(req.params.id, function(err, medicine){
        res.render('details', {
            medicine: medicine
        });
    });
});

//edit med
router.get('/edit/:id', function(req, res){
    Medicine.findById(req.params.id, function(err, medicine){
        res.render('edit',{
            title: "Edit Medicine",
            medicine:medicine
        })
    })
});

//edit post
router.post('/edit/:id', function(req, res){
    let medicine = {};
    medicine.name = req.body.name;
    medicine.use = req.body.use;
    medicine.description = req.body.description;

    let query = {_id:req.params.id}
    Medicine.update(query, medicine, function(err){
        if(err) {
            console.log(err);
            return;
        } else {

            req.flash('success', 'Article Updated')
            res.redirect('/');
        }
    });
});
// delete med
router.delete('/delete/:id', function(req, res){
    let medicine= new Medicine();
       medicine.name = req.body.name;
       medicine.use = req.body.use;
       medicine.description = req.body.description;
       
       let query = {_id:req.params.id};
       Medicine.remove(query, medicine,function(err){
           if(err) {
               console.log(err);
           }
           else {
               res.send('Success');
           }
       })
   });
 


module.exports = router;