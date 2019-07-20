/* GET home page */
const homelist = (req, res) => {
  res.render('locations-list', {title: 'Home'});
};

/* GET Location info page */
const locationInfo = (req, res) => {
  res.render('location-info', {title: 'Location Info'});
};

/* GET Add review page */
const addReview = (req, res) => {
  res.render('index', {title: 'Add Review page'});
};

module.exports = {
  homelist,
  locationInfo,
  addReview
};
