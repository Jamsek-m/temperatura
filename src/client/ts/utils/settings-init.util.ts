import {LOCAL_STORAGE_MINUTES_KEY} from "../configs/constants.config";
import {DataUtil} from "./data.util";

export class SettingsInitUtil {

    public static initializeEventListeners(className: string): void {
        const elements: HTMLElement[] = <HTMLElement[]>Array.from(document.getElementsByClassName(className));
        const localKey = localStorage.getItem(LOCAL_STORAGE_MINUTES_KEY);
        elements.forEach(elem => {
            SettingsInitUtil.markChosenElem(elem, localKey);
            elem.addEventListener("click", SettingsInitUtil.settingsEvent);
        });
    }

    private static markChosenElem(elem: HTMLElement, localKey: string) {
        const attr = elem.getAttribute("data-minutes");
        if (localKey) {
            if (attr === localKey) {
                elem.classList.add("chosen-minutes");
            }
        } else if (attr === "30") {
            elem.classList.add("chosen-minutes");
        }
    }

    private static toggleChosenMinutes(targetElem: HTMLElement) {
        const oldElement = document.getElementsByClassName("chosen-minutes")[0];
        oldElement.classList.remove("chosen-minutes");
        targetElem.classList.add("chosen-minutes");
    }

    private static settingsEvent(e: Event): void {
        const target: HTMLElement = <HTMLElement>e.target;
        localStorage.setItem(LOCAL_STORAGE_MINUTES_KEY, target.getAttribute("data-minutes"));
        SettingsInitUtil.toggleChosenMinutes(target);
        DataUtil.getDataAndDrawGraphs();
        DataUtil.getExtremesAndDisplay();
    }


}
