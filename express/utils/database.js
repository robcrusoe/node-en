const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'node-complete',
    'root',
    'arkasain',
    { dialect: 'mysql', host: 'localhost' }
);

module.exports = sequelize;