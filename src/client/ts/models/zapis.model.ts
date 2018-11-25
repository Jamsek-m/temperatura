export class Zapis {
    public id: number;
    public datum: Date;
    public vlaga: number;
    public zuntp: number;
    public nottp: number;
    public tlak: number;
}

export class ZapisModel {
    public vlaga: any[];
    public temperatura: any[];
    public tlak: any[];

    constructor(zapisi: Zapis[]) {
        this.vlaga = [];
        this.temperatura = [];
        this.tlak = [];

        zapisi.forEach((zapis: Zapis) => {
            this.vlaga.push([new Date(zapis.datum), zapis.vlaga]);
            this.tlak.push([new Date(zapis.datum), zapis.tlak]);
            this.temperatura.push([new Date(zapis.datum), zapis.zuntp, zapis.nottp]);
        });
    }
}

export class ZapisKey {
    public datum: Date;
    public value: any;

    constructor(datum: Date, value: any) {
        this.datum = datum;
        this.value = value;
    }
}
