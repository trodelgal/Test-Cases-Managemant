const { Router } = require('express');
const {
    Perequisite
} = require('../models');
const router = Router();

// update details
router.put('/:id', async (req, res) => {
  try {
    const updated = await Perequisite.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated[0] === 1) return res.json({ message: 'Perequisite updated' });
    res.status(404).json({ error: 'Perequisite not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post new test
router.post('/', async (req, res) => {
  try {
    const newStep = await Perequisite.create(req.body);
    res.json(newStep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete test
router.patch('/delete', async (req, res) => {
  try {
    const { dataId } = req.body;
    const deleted = await Perequisite.destroy({
      where: { id: dataId },
    });
    if (deleted) return res.json({ message: 'Perequisite deleted' });
    return res.status(404).json({ error: 'Perequisite not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;