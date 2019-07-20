const about = (req, res) => {
  res.render('generic-text', {
    title: 'About page',
    content: 'Loc8r was created to help people find places to sit down and get a bit of work done.<br/></br> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit sint, repellendus dignissimos eligendi quidem nesciunt nisi alias laborum minus adipisci sed facilis unde consectetur culpa illum sunt velit tenetur soluta. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit sint, repellendus dignissimos eligendi quidem nesciunt nisi alias laborum minus adipisci sed facilis unde consectetur culpa illum sunt velit tenetur soluta. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit sint, repellendus dignissimos eligendi quidem nesciunt nisi alias laborum minus adipisci sed facilis unde consectetur culpa illum sunt velit tenetur soluta. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit sint, repellendus dignissimos eligendi quidem nesciunt nisi alias laborum minus adipisci sed facilis unde consectetur culpa illum sunt velit tenetur soluta.'
  });
};

module.exports = {
  about
};
