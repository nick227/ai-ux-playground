
const routes = require('./routes');
const API_PORT = 4200;

function startApiListeners(app) {

    function registerRoutes(routes) {
        routes.forEach(({ type, path, fn }) => {
            app[type](path, fn);
        });
    }

    registerRoutes(routes);

    app.listen(API_PORT, () => {
        console.log("\n");
        console.log(`*  API Server running at http://localhost:${API_PORT}/`);
      });
      
}

module.exports = startApiListeners;