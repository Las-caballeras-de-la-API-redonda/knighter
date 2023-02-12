var express = require('express');
var router = express.Router();

const listUser = require("../controllers/users").list;
const createUser = require("../controllers/users").create;
const updateUser = require("../controllers/users").update;
const deleteUser = require("../controllers/users").delRegister;

/**
 * Devuelve la información de los usuarios.
 */
router.get('/', function(req, res, next) {
  listUser(req, res, next);
});

/**
 * Crea un nuevo User.
 */
router.post('/', function(req, res, next) {
  createUser(req, res, next);
});

/**
 * Actualiza un User.
 */
router.put('/', function(req, res, next) {
  updateUser(req, res, next);
});

/**
 * Borra un honor
 */
router.delete('/', function(req, res, next) {
  deleteUser(req, res, next);
});

module.exports = router;
