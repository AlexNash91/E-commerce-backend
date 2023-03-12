const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
        // be sure to include its associated Product data
      include: [{ model: Product}],
    });
    res.status(200).json(tags);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try { 
    const tags = await Tag.findbyPk(req.params.id, {
        // be sure to include its associated Product data
      include: [{ model: Product}]
    });
    if (!tags) {
      res.status(404).json({message: 'Tag not found' });
      return;
    };

    res.status(200).json(tags);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tags);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update(
      {
      category_name: req.body.category_name,
      }, 
      {
    where: {
      id: req.params.id,
      },
    })
    if (!tags) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tags) {
      res.status(404).json({message: 'Tag not found' });
      return;
    }
    res.status(200).json(tags);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
