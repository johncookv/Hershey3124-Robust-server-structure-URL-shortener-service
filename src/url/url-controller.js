const path = require("path");
const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href: res.locals.href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function hasHref(req, res, next) {
  const { data: { href } = {} } = req.body;

  if (href) {
    res.locals.href = href;
    return next();
  }
  next({ status: 400, message: "A 'href' property is required." });
}

function list(req, res) {
  res.json({ data: urls });
}

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `${urlId}`,
  });
}

function read(req, res) {
  res.status(200).json({ data: res.locals.url });
}

function update(req, res) {
  const { data: { href } = {} } = req.body;
  res.locals.url.href = href;
  res.json({ data: res.locals.url });
}

function recordUrl(req, res, next) {
  const urlId = req.params.urlId;
  const useRecord = {
    id: urls.length + 1,
    urlId: parseInt(urlId),
    time: Date.now(),
  };
  uses.push(useRecord);
  return next();
}
module.exports = {
  create: [hasHref, create],
  list,
  read: [urlExists, recordUrl, read],
  update: [urlExists, hasHref, update],
  urlExists,
};
