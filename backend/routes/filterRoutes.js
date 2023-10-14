const express = require("express");
const filterController = require("../controllers/filterController");

filterRouter = express.Router();

filterRouter.post("/search-filter", filterController.filterData);


module.exports = filterRouter;