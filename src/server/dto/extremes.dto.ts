
export class Extremes {
    public notranjaTemperatura: ExtremeObject;
    public zunanjaTemperatura: ExtremeObject;
}

export class ExtremeObject {
    public max: number;
    public min: number;

    constructor(max: number, min: number) {
        this.max = max;
        this.min = min;
    }
}
