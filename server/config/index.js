const env = process.env.NODE_ENV || "dev";

const config = require(`./env/${env.toLowerCase()}`); // eslint-disable-line import/no-dynamic-require

module.exports = config;
