const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));

function list(req, res) {
  res.json({ data: res.locals.uses });
}

function filterByUseId(req, res, next) {
  const { useId } = req.params;
  const byUseId = useId
    ? (use) => use.useId === Number(useId)
    : () => true;
  res.locals.uses = uses.filter(byUseId);
  next();
}

function usesExists(req, res, next) {
  const useId = Number(req.params.useId);
  const founduses = res.locals.uses.find(
    (use) => use.id === useId
  );
  if (founduses) {
    res.locals.use = founduses;
    return next();
  }
  next({
    status: 405,
    message: `use id not found: ${req.params.useId}`,
  });
}

function read(request, res, next) {
  res.json({ data: res.locals.uses });
}

function destroy(req, res) {
  const { urlsId } = req.params;
  const index = urls.findIndex((url) => url.id === Number(urlsId));
  if (index > -1) {
    urls.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list: [filterByUseId, list],
  read: [filterByUseId, usesExists, read],
  delete: destroy, usesExists,
};