const routes = require('next-routes')();


routes.add('/entities/new', '/entities/new')
routes.add('/entities/:entityAddress/show', '/entities/show')
routes.add('/entities/:entityAddress/token', '/entities/token/index')
routes.add('/entities/:entityAddress/token/new', '/entities/token/new')
routes.add('/entities/:entityAddress/token/:tokenAddress/show', '/entities/token/show')
routes.add('/entities/:entityAddress/token/:tokenAddress/crowdsale/new', '/entities/token/crowdsale/new')
routes.add('/entities/:entityAddress/token/crowdsale', '/entities/token/crowdsale/index')
routes.add('/entities/:entityAddress/crowdsale/:crowdsaleAddress/show', '/entities/token/crowdsale/show')
routes.add('/entities/:entityAddress/token/:tokenAddress/crowdsale/:crowdsaleAddress/fund', '/entities/token/crowdsale/fund')
routes.add('/entities/:entityAddress/requests', '/entities/requests/index')
routes.add('/entities/:entityAddress/requests/new', '/entities/requests/new')

module.exports = routes;
