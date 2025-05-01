const { Router } = require('express');
const { 
  encode, 
  decode, 
  statistics, 
  list 
} = require('../controllers/urlController');

const router = Router();

router.post('/encode', encode);
router.post('/decode', decode);
router.get('/statistic/:url_path', statistics);
router.get('/list', list);

module.exports = router;