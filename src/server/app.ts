import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";

import IndexController from "./controllers/index.controller";
import ApiController from "./controllers/api.controller";
import {DBConnection} from "./repositories/db.connection";

class App {
    public express: any;

    constructor() {
        this.express = express();
        this.serveStaticContent();
        this.setTemplateEngine();
        this.initializeMiddlewares();
        this.initializeComponents();
        this.initializeRoutes();
    }

    private serveStaticContent(): void {
        this.express.use(express.static(path.join(__dirname, "..", "..", "public")));
    }

    private setTemplateEngine(): void {
        this.express.set("view engine", "ejs");
        this.express.set("views", path.join(__dirname, "..", "client", "views"));
    }

    private initializeMiddlewares(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private initializeComponents(): void {
        DBConnection.initializeDatabase();
    }

    private initializeRoutes(): void {
        // const router = express.Router();
        this.express.use("/", IndexController);
        this.express.use("/api/v1/meritve", ApiController);
    }
}

export default new App().express;
