const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsListByDistance = async (req, res) => {
    /* Gets lng, lat values from /locations?lng=x.x&lat=y.y */
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    
    /* Creates the geoJSON */
    const near = {
        type: "Point",
        coodinates: [lng, lat]
    };

    const geoOptions = {
        distanceField: "distance.calculated",
        spherical: true,
        maxDistance: 20000,
        limit: 10
    };

    if (!lng || !lat) {
        return res.status(404).json({"message": "lng and lat query parameters are required."});
    }

    try {
        const results = await Loc.aggregate([
            {
                $geoNear: {
                    near,
                    ...geoOptions
                }
            }
        ]);

        const locations = results.map(result => {
            return {
                id: result._id,
                name: result.name,
                address: result.address,
                rating: result.rating,
                facilities: result.facilities,
                distance: `${result.distance.calculated.toFixed()}m`
            }
        });

        return res.status(200).json(locations);
    } catch (err) {
        res.status(404).json(err);
        console.log(err);
    }
};

const locationsCreate = (req, res) => {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)    
            ]
        },
        openingTimes: [
            {
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            },
            {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }
        ]
    }, (err, location) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(location);
        }
    });
};

const locationsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationId)
        .exec((err, location) => {
            if(!location) {
                return res
                        .status(404)
                        .json({"message": "location not found."});
            }

            if(err) { return res.status(404).json(err); }
            
            res
                .status(200)
                .json(location);
        });
};

const locationsUpdateOne = (req, res) => {
    if(!req.params.locationId) {
        return res.status(404).json({"message": "Location Id required."});
    }

    Loc
        .findById(req.params.locationId)
        .select('-reviews -rating')
        .exec((err, location) => {
            if(!location) {
                return res.status(404).json({"message": "Location not found."});
            }

            if(err) {
                return res.status(400).json(err);
            }

            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');
            location.coords = [
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ];
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1,
              }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
              }];
              location.save((err, loc) => {
                  if(err) {
                      return res.status(400).json(err);
                  } else {
                      return res.status(200).json(loc);
                  }
              });
        });
};

const locationsDeleteOne = (req, res) => {};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
}