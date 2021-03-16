const { Router } = require('express');
const {
  Test,Step,Data,Perequisite
} = require('../models');
const router = Router();

// get all the tests with the details
router.get('/', async (req, res)=>{
  try{
    const allTests = await Test.findAll({
      include:[{
        model:Step,
        attributes:["id"]
      }]
    });
    return res.json(allTests);
  }catch(err){
    return res.json(err)
  }
});

// get one the tests with the details
router.get('/:id', async (req, res)=>{
  try{
    const allTests = await Test.findOne({
      where:{id:req.params.id},
      include:[{
        model:Step
      },{
        model:Data
      },{
        model:Perequisite
      }]
    });

    return res.json(allTests);
  }catch(err){
    return res.json(err)
  }
});

// update details
router.put('/:id', async (req, res) => {
  try {
    const updated = await Test.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated[0] === 1) return res.json({ message: 'Test updated' });
    res.status(404).json({ error: 'Test not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post new test
router.post('/', async (req, res) => {
  try {
    const newTest = await Test.create(req.body);
    res.json(newTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete test
router.patch('/delete', async (req, res) => {
  try {
    const { testId } = req.body;
    const deleted = await Test.destroy({
      where: { id: testId },
    });
    if (deleted) return res.json({ message: 'Test deleted' });
    return res.status(404).json({ error: 'Test not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;