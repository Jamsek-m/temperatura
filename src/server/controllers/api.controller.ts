import {NextFunction, Request, Response, Router} from "express";
import {ZapisService} from "../services/zapis.service";
import {Zapis} from "../dto/zapis.dto";
import {ZapisMapper} from "../mappers/zapis.mapper";

class ApiController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get("/", this.getAllZapisi);
        this.router.post("/", this.createZapis);
    }

    private getAllZapisi(req: Request, res: Response, next: NextFunction): void {
        ZapisService.getAll(req.query["minutes"]).then(
            (zapisi: Zapis[]) => {
                return res.status(200).json(zapisi);
            },
            (error: Error) => {
                return res.status(500).json({message: "Server error!"});
            }
        )
    }

    private createZapis(req: Request, res: Response, next: NextFunction): void {
        if (ZapisService.validateZapis(req.body)) {
            const zapis = ZapisMapper.bodyToZapis(req.body);
            ZapisService.saveZapis(zapis).then(
                () => {
                    res.status(200).json({message: "OK"});
                }
            )
        } else {
            res.status(400).json({message: "Bad request! All requested fields must be present!"});
        }
    }
}

export default new ApiController().router;
