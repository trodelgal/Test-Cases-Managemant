const { Router } = require('express');
const {
 Data
} = require('../models');
const router = Router();

// update details
router.put('/:id', async (req, res) => {
  try {
    const updated = await Data.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated[0] === 1) return res.json({ message: 'Data updated' });
    res.status(404).json({ error: 'Data not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post new test
router.post('/', async (req, res) => {
  try {
    const newData = await Data.create(req.body);
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete test
router.patch('/delete', async (req, res) => {
  try {
    const { dataId } = req.body;
    const deleted = await Data.destroy({
      where: { id: dataId },
    });
    if (deleted) return res.json({ message: 'Data deleted' });
    return res.status(404).json({ error: 'Data not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;