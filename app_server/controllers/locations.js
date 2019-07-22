const request = require('request');

const apiOptions = {
  local: 'http://localhost:3000',
  server: 'https://mean-loc8r-app.herokuapp.com'
}

const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if(!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }

  res.render('locations-list', 
  {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Fin places to work with wifi near you!'
    },
    locations: responseBody,
    message
  });
};

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if (distance > 1000) {
    thisDistance = parseFloat(distance/1000).toFixed(1);
    unit = 'km';
  } else {
    thisDistance = Math.floor(distance);
  }

  return thisDistance + unit;
};

/* GET home page */
const homelist = (req, res) => {
  const path = '/api/locations';
  const requestOptions = {
    url: `${apiOptions.local}${path}`,
    method: 'GET',
    json: {},
    qs: {
      lng: -0.7992599,
      lat: 51.378091,
    }
  };

  request(requestOptions, (err, {statusCode}, body) => {
    let data = [];
    if(statusCode === 200 && body.length) {
      data = body.map((item) => {
        item.distance = formatDistance(item.distance);
        return item;
      });
    }

    renderHomepage(req,res,data);
  })
};

const renderDetailPage = (req, res, location) => {
  res.render('location-info', 
  {
    title: location.name,
    pageHeader: {title: location.name},
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leavea review to help other people just like you.'
    },
    location
  });
}

const showError = (req, res, status) => {
  let title = "";
  let content = "";
  if(status === 404) {
    title = "404 Page not found.";
    content = "Oh no, looks like this page doesn't exist. :(";
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something broke, somewhere :0';
  }

  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};

const getLocationInfo = (req, res, callback) => {
  const path = `/api/locations/${req.params.locationId}`;
  const requestOptions = {
    url: `${apiOptions.local}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      const data = body;
      if (statusCode === 200) {
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        }
        callback(req, res, data);
      } else {
        showError(req, res, statusCode);
      }
    }
  );
};

/* GET Location info page */
const locationInfo = (req, res) => {
  getLocationInfo(req, res,
    (req, res, responseData) => renderDetailPage(req, res, responseData)
  );
};

const renderReviewForm = (req, res, {name}) => {
  res.render('location-review-form',
    {
      title: `Review ${name} on Loc8r` ,
      pageHeader: { title: `Review ${name}` },
      error: req.query.err
    }
  );
};



/* GET Add review page */
const addReview = (req, res) => {
  getLocationInfo(req, res,
    (req, res, responseData) => renderReviewForm(req, res, responseData)
  );
};

const doAddReview = (req, res) => {
  const locationid = req.params.locationId;
  const path = `/api/locations/${locationid}/reviews`;
  const postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  const requestOptions = {
    url: `${apiOptions.local}${path}`,
    method: 'POST',
    json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
    request(
      requestOptions,
      (err, {statusCode}, {name}) => {
        if (statusCode === 201) {
          res.redirect(`/location/${locationid}`);
        } else if (statusCode === 400 && name && name === 'ValidationError') {
          res.redirect(`/location/${locationid}/review/new?err=val`);
        } else {
          showError(req, res, statusCode);
        }
      }
    );
  }
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
  doAddReview
};
