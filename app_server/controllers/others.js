const about = (req, res) => {
  res.render('generic-text', {title: 'About page'});
};

module.exports = {
  about
};
