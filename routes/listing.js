get = (req, res, next) => {
  let query;
  if(req.query.municipality)
    query = req.models.Listing.find({ municipality: req.query.municipality });
  else
    query = req.models.Listing.find();
  query.exec()
    .then(listings => res.send(listings))
    .catch(error => next(error))
}

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then(listing => {
    return res.send(listing);
  }).catch(error => next(error))
}

post = (req, res, next) => {
  req.models.Listing.create({
    coords: {
      lat: req.body.coords.lat,
      lng: req.body.coords.lng
    },
    street: {
      name: req.body.street.name,
      number: req.body.street.number
    },
    municipality: req.body.municipality,
    type: req.body.type,
    price: req.body.price,
    fee: req.body.fee,
    bidding: req.body.bidding
  }).then(created => res.status(201).send(created))
    .catch(error => next(error));
}

put = (req, res, next) => {
  req.models.Listing.updateOne({ _id: req.params.id }, {
    coords: {
      lat: req.body.coords.lat,
      lng: req.body.coords.lng
    },
    street: {
      name: req.body.street.name,
      number: req.body.street.number
    },
    municipality: req.body.municipality,
    type: req.body.type,
    price: req.body.price,
    fee: req.body.fee,
    bidding: req.body.bidding
  }, {
    new: true,
    upsert: true
  }).then(status => {
    if(status.upserted)
      res.status(201)
    else if(status.nModified)
      res.status(200)
    else
      res.status(204)
    res.send()
  }).catch(error => next(error))
}

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id).then(deleted => {
    if(deleted) return res.status(200).send(deleted);
    res.sendStatus(204);
  }).catch(error => next(error));
}

module.exports = {
  get,
  getById,
  post,
  put,
  deleteById
}
