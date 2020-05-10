const router = require('express').Router();

router.get('/', (req, res) => {
  
  res.render('index', {
  });
});

router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/works', (req, res) => {
  res.render('works');
});
router.get('/crud', (req, res) => {
  res.render('crud');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;
