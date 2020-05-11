const routes = require('next-routes')();


routes.add('/entities/new', '/entities/new')
routes.add('/entities/:entityAddress/show', '/entities/show')
routes.add('/entities/:entityAddress/dashboard', '/entities/dashboard')
routes.add('/entities/:entityAddress/token', '/entities/token/index')
routes.add('/entities/:entityAddress/token/new', '/entities/token/new')
routes.add('/entities/:entityAddress/token/:tokenAddress/show', '/entities/token/show')
routes.add('/entities/:entityAddress/requests', '/entities/requests/index')
routes.add('/entities/:entityAddress/requests/new', '/entities/requests/new')
routes.add('/entities/:entityAddress/membershipRequests', '/entities/membershipRequests/index')
routes.add('/entities/:entityAddress/membershipRequests/new', '/entities/membershipRequests/new')


module.exports = routes;
