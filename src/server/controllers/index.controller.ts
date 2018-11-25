import {NextFunction, Request, Response, Router} from "express";

class IndexController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get("/", this.getIndexPage);
    }

    private getIndexPage(req: Request, res: Response, next: NextFunction) {
        res.render("index");
    }
}

export default new IndexController().router;
