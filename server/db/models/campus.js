const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('campus', {
  // define your model here!
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://fedpractice.com/content/uploads/2018/03/placeholder.png'
  }
});

