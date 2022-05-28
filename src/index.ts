import express from "express";
const app = express()
const port = 3000

class HttpServer {

    constructor() {
        const handlers = this.HandlersDefinition();
        
        for (const handler of handlers) {
            console.log(`Loading API: ${handler.method.toUpperCase()}: ${handler.path} -> ${handler.name}`)
            app[handler.method](handler.path, <any>handler.handler);
        }
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        });
    }

    private HandlersDefinition(): IApiDefinition[] {
        return [
            {
                name: "GetRoot",
                handler: this.GetRoot,
                path: "/",
                method: EHttpMethods.GET
            }
        ]
    }

    private GetRoot(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(`Executing GetRoot`);
        res.send('Hello World!');
        next();
    }
}

enum EHttpMethods {
    GET = "get",
    POST = "post"
}

interface IApiDefinition {
    name: string,
    handler: Function,
    path: string,
    method: EHttpMethods
}

const server = new HttpServer();

module.exports = app