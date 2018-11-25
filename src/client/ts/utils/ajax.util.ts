
export class AjaxUtil {

    private request: XMLHttpRequest;

    constructor(method: string, url: string) {
        this.request = new XMLHttpRequest();
        this.request.open(method, url, true);
        this.request.setRequestHeader("Content-Type", "application/json");
    }

    addOnSuccess(func: EventListener) {
        this.request.addEventListener("load", func);
        return this;
    }

    addOnError(func: EventListener) {
        this.request.addEventListener("error", func);
        return this;
    }

    send(data?: any) {
        this.request.send(data);
    }

}

export interface AjaxResponse {
    status: number;
    statusText: string;
    response: string;
    responseText: string;
    responseURL: string;
}
