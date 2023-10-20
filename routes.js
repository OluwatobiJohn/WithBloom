const nextRoutes = require('next-routes');
const routes = nextRoutes();

routes.add('login', '/login', 'index');

module.exports = routes;
