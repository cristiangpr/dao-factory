const routes = require('next-routes')();


routes.add('/entities/new', '/entities/new')
routes.add('/entities/:address', '/entities/show')
routes.add('/entities/:address/token', '/entities/token/index')
routes.add('/entities/:address/token/new', '/entities/token/new')
routes.add('/entities/:address/token/:address/show', '/entities/token/show')
routes.add('/entities/:address/requests', '/entities/requests/index')
routes.add('/entities/:address/requests/new', '/entities/requests/new');


module.exports = routes;
