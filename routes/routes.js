const express = require('express');
const dataModel = require('../model/model');
const router = express.Router();

// we'll have 5 routes for our endpoints
// 1) posting data to dataBase
router.post('/post', async (req, res)=>{
    const data = new dataModel({
        name: req.body.name,
        age: req.body.age
    })

    try {
        // here, we are saving the data using data.save(). Then, we are storing the data in a const called dataToSave.
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

// 2) getting all the data from the database
router.get('/getAll', async (req, res)=>{
    try {
        const allData = await dataModel.find();
        res.send(allData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// 3) getting data based on ID
router.get('/getOne/:id', async (req, res)=>{
    try {
        const data = await dataModel.findById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// 4) updating data based on the ID
router.patch('/update/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await dataModel.findByIdAndUpdate( id, updatedData, options);

        res.send(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// 5) deleting data based on the ID
router.delete('/delete/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await dataModel.findByIdAndDelete(id);
        res.send(`Document with data name: ${data.name} got deleted`);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;
