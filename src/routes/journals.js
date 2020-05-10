const Journal = require('../models/journal');
const router = require('express').Router();

const { ensureAuthentication } = require('../helpers/auth');

router.use((req, res, next) => {
  ensureAuthentication(req, res, next);
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
// ADD: RENDERING VIEW TASK FORM
router.get('/add', (req, res) => {
    res.render('journals/add');
});


// SAVE A TASK
router.post('/add', async (req, res) => {
  let { title, entry} = req.body;
  let errors = [];

  if (!title) {
    errors.push({text: 'Please add a title'});
  }
  if (!entry) {
    errors.push({text: 'Please add a Entry'});
  }

  // Rendering Error
  if (errors.length > 0) {
    res.render('journals/add', {
      errors,
      title,
      entry
    });
  }
  else { // Saving Journal
    const newJournal = {
      title: req.body.title,
      entry: req.body.entry,
      user: req.user.id
    }
    let journal = new Journal(newJournal);
    await journal.save();
    req.flash('success_msg', 'journal added.');
    res.redirect('/journals');
  }
});

// RENDEDERING TASKS
router.get('/', async (req, res) => {
  let journals = await Journal.find({user: req.user.id})
              .sort({date: 'desc'});
  res.render('journals/index', {
    journals
  });
});

// RENDERING TASK EDIT
router.get('/edit/:id', async (req, res) => {
  let journal = await Journal.findById(req.params.id);
  if (journal.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/journals');
  } else {
    res.render('journals/edit', {
      journal
    });
  }
});

// EDITING
router.put('/edit/:id', async (req, res) => {
  let journal = await Journal.findById(req.params.id);
  journal.title = req.body.title;
  journal.entry = req.body.entry;
  await journal.save();
  req.flash('success_msg', 'journal updated.');
  res.redirect('/journals');
});

// DELETE TASK
router.delete('/delete/:id', async (req, res) => {
  await Journal.findByIdAndRemove(req.params.id);
  req.flash('success_msg', 'journal removed.');
  res.redirect('/journals');
});

module.exports = router;
