
export class DateUtil {

    public static toString(date: Date): string {
        return `${date.getFullYear()}-${DateUtil.pad(date.getMonth() + 1)}-${DateUtil.pad(date.getDate())} ` +
        `${DateUtil.pad(date.getHours())}:${DateUtil.pad(date.getMinutes())}:${DateUtil.pad(date.getSeconds())}`;
    }

    private static pad(num: number): string {
        return `${num < 10 ? "0" : ""}${num}`;
    }

}
