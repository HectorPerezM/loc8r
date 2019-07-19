const about = (req, res) => {
  res.render('index', {title: 'About page'});
};

module.exports = {
  about
};
