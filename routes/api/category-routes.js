const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories
  const categories = await Category.findAll({
    // include its associated Products
    include: [{ model: Product }],
  });
  res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{    
    const catagories = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product}],
});

if (!catagories) {
  res.status(404).json({message: 'Route not found'})
  return;
};

res.status(200).json(categories);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(
      {
      category_name: req.body.category_name,
      }, 
      {
    where: {
      id: req.params.id,
      },
    })
    if (!categories) {
      res.status(404).json({ message: 'Route not found' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where : {
        id: req.params.id
      }
    });
    if (!categories) {
      res.status(404).json({message: 'Route not found'});
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
