const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));


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
    res.locals.href = href
    return next();
  }
  next({ status: 400, message: "A 'href' property is required." });
}

function list(req, res) {
  res.json({ data: urls });
}

function urlExists(req, res, next) {
  const urlsId = Number(req.params.urlsId);
  const foundUrl = urls.find((url) => url.id === urlsId);
  if (foundUrl) {
    res.locals.url = foundUrl
    return next();
  }
  next({
    status: 404,
    message: `${urlsId}`,
  });
}

function read(req, res) {
  res.json({ data: res.locals.url });
}

function update(req, res) {
  const { data: { href } = {} } = req.body;
  res.locals.url.href = href;
  res.json({ data: res.locals.url });
}

function recordurl(req, res) {
  const urlId = req.params.urlId;
  const useRecord = {
    id: urls.length + 1,
    urlId: urlId,
    time: Date.now()
  };
  urls.push(useRecord);
  console.log("record", useRecord)
  res.status(200).json({ data: useRecord });
}
module.exports = {
  create: [hasHref, create],  
  list,
  read:[urlExists, recordurl, read],
  update: [urlExists,hasHref, update],
  urlExists
}