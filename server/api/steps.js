const { Router } = require('express');
const {
 Step
} = require('../models');
const router = Router();

// update details
router.put('/:id', async (req, res) => {
  try {
    const updated = await Step.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated[0] === 1) return res.json({ message: 'Step updated' });
    res.status(404).json({ error: 'Step not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post new test
router.post('/', async (req, res) => {
  try {
    const newStep = await Step.create(req.body);
    res.json(newStep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete test
router.patch('/delete', async (req, res) => {
  try {
    const { dataId } = req.body;
    const deleted = await Step.destroy({
      where: { id: dataId },
    });
    if (deleted) return res.json({ message: 'Step deleted' });
    return res.status(404).json({ error: 'Step not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;