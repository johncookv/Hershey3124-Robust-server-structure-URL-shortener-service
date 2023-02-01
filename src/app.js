const express = require("express");
const urlsRouter = require("./url/url-router");
const usesRouter = require("./uses/uses.router")
const app = express();

app.use(express.json());

app.use("/urls", urlsRouter)
app.use("/uses", usesRouter)

app.use((req, res, next) => {
    return next({ status: 404, message: `Method Not Allowed: ${req.method} for ${req.originalUrl}` });
  });
  
  // Error handler
  app.use((error, req, res, next) => {
    //console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });
  
  module.exports = app;
