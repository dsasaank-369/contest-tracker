function parseCodechef(contests) {
    return contests.map(contest => {
        const startTime = contest.contest_start_date_iso
            ? new Date(contest.contest_start_date_iso).getTime()
            : null;
        const endTime = contest.contest_end_date_iso
            ? new Date(contest.contest_end_date_iso).getTime()
            : null;

        if (!startTime || !endTime) {
            console.warn("Invalid contest dates:", contest);
        }

        return {
            id: contest.contest_code,
            name: contest.contest_name,
            platform: 'CodeChef',
            url: `https://www.codechef.com/${contest.contest_code}`,
            startTime,
            endTime,
            duration: (startTime && endTime) ? (endTime - startTime) / 1000 : 0,
            status: startTime && endTime ? getContestStatus(startTime, endTime) : 'UNKNOWN'
        };
    });
}



function parseLeetcode(contests) {
    return contests.map(contest => {
        const startTime = contest.startTime * 1000; 
        const endTime = startTime + (contest.duration * 1000);
        return {
            id: contest.titleSlug,
            name: contest.title,
            platform: 'LeetCode',
            url: `https://leetcode.com/contest/${contest.titleSlug}`,
            startTime,
            endTime,
            duration: contest.duration, 
            image: contest.cardImg,
            status: getContestStatus(startTime, endTime)
        };
    });
}

function parseCodeforces(contests, isPast = false) {
    return contests
        .filter(contest => isPast ? contest.phase === 'FINISHED' : contest.phase !== 'FINISHED')
        .map(contest => {
            const startTime = contest.startTimeSeconds * 1000; 
            const endTime = startTime + (contest.durationSeconds * 1000);
            return {
                id: contest.id.toString(),
                name: contest.name,
                platform: 'Codeforces',
                url: `https://codeforces.com/contest/${contest.id}`,
                startTime,
                endTime,
                duration: contest.durationSeconds, 
                status: getContestStatus(startTime, endTime)
            };
        });
}

function getContestStatus(startTime, endTime) {
    if (!startTime || !endTime || isNaN(startTime) || isNaN(endTime)) {
        return 'UNKNOWN';
    }

    const now = Date.now();
    if (now < startTime) {
        return 'UPCOMING';
    } else if (now >= startTime && now <= endTime) {
        return 'ONGOING';
    } else {
        return 'FINISHED';
    }
}


module.exports = {
    parseCodechef,
    parseLeetcode,
    parseCodeforces
};