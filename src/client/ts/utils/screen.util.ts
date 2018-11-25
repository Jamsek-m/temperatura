
export class ScreenUtil {

    public static getScreenWidth(): number {
        return window.innerWidth;
    }

    public static getCalculatedGraphWidth(): number {
        return ScreenUtil.getScreenWidth() - 20;
    }

}
