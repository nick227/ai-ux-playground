
import routes from './routes/index.js';
const API_PORT = 4200;

export default function startApiListeners(app) {

    function registerRoutes(routes) {
        routes.forEach(({ type, path, fn }) => {
            app[type](path, fn);
        });
    }

    registerRoutes(routes);

    return app.listen(API_PORT, () => {
        console.log("\n");
        console.log(`*  API Server running at http://localhost:${API_PORT}/`);
      });
}