const uses = require("../data/uses-data");

function list(req, res) {
  res.json({ data: res.locals.uses });
}

function filterByUseId(req, res, next) {
  const { usesId } = req.params;
  const byUseId = usesId ? (use) => use.id === Number(usesId) : () => true;
  const filteredUses = uses.filter(byUseId);
  if (filteredUses.length) {
    res.locals.uses = filteredUses;
    return next();
  }
  next({
    status: 404,
    message: `uses id not found: ${usesId}`,
  });
}

function usesExists(req, res, next) {
  const useId = Number(req.params.usesId);
  const foundUse = res.locals.uses.find((use) => use.id === useId);
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({
    status: 405,
    message: `use id not found: ${req.params.usesId}`,
  });
}

function read(request, res, next) {
  res.status(200).json({ data: res.locals.use });
}

function destroy(req, res) {
  const { usesId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(usesId));
  if (index > -1) {
    uses.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: `use id not found: ${usesId}` });
  }
}

module.exports = {
  list: [filterByUseId, list],
  read: [filterByUseId, usesExists, read],
  delete: destroy,
  usesExists,
};
