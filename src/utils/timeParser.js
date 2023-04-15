// calculate time elapsed from now using luxon
// https://moment.github.io/luxon/docs/manual/parsing.html#parsing-from-sql
// https://moment.github.io/luxon/docs/manual/other-info.html#browser-support

import {DateTime} from "luxon";

export function parseFromNow(time) {
    if (time) {
        const now = DateTime.local();
        const parsedTime = DateTime.fromISO(time, {zone: 'Europe/Rome'});
        const duration = now.diff(parsedTime, ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']);

        if (duration.years > 0) {
            return `${duration.years} yy fa`;
        } else if (duration.months > 0) {
            return `${duration.months} mm fa`;
        } else if (duration.weeks > 0) {
            return `${duration.weeks} ww fa`;
        } else if (duration.days > 0) {
            return `${duration.days} gg fa`;
        } else if (duration.hours > 0) {
            return `${duration.hours} ore fa`;
        } else if (duration.minutes > 0) {
            return `${duration.minutes} min fa`;
        } else if (duration.seconds > 0) {
            return `${Math.trunc(duration.seconds)} sec fa`;
        } else {
            return 'adesso';
        }
    }
}