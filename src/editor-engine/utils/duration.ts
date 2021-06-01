export interface Duration {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};

export const durationObjectToSeconds = (duration: Duration): number => {
    let value = 0;

    if (duration.years !== undefined) {
        value += duration.years * 31536000;
    }
    if (duration.months !== undefined) {
        value += duration.months * 2592000;
    }
    if (duration.days !== undefined) {
        value += duration.days * 86400;
    }
    if (duration.hours !== undefined) {
        value += duration.hours * 3600;
    }
    if (duration.minutes !== undefined) {
        value += duration.minutes * 60;
    }
    if (duration.seconds !== undefined) {
        value += duration.seconds;
    }
    return value;
}
