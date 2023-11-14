import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();

export default function startApiListeners(app) {

    function registerRoutes(routes) {
        routes.forEach(({ type, path, fn }) => {
            app[type](path, fn);
        });
    }

    registerRoutes(routes);

    return app.listen(process.env.API_PORT, () => {
        console.log("\n");
        console.log(`*  API Server running at http://localhost:${process.env.API_PORT}/`);
      });
}