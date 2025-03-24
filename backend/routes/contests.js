const express = require('express');
const router = express.Router();
const axios = require('axios');
const { parseCodechef, parseCodeforces, parseLeetcode } = require("../utils/parsers.js");

router.get('/', async (req, res) => {
    try {
        const codechefRequest = axios.post('https://www.codechef.com/api/list/contests/all', {
                sort_by: 'START',
                sorting_order: 'asc',
                offset: 0,
                mode: 'all'
            }, {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const leetcodeRequest = axios.post('https://leetcode.com/graphql', {
            query: `{
                topTwoContests {
                    title
                    startTime
                    duration
                    cardImg
                    titleSlug
                }
            }`
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        const codeforcesRequest = axios.get('https://codeforces.com/api/contest.list');

        const [codechefResponse, leetcodeResponse, codeforcesResponse] = await Promise.all([
            codechefRequest,
            leetcodeRequest,
            codeforcesRequest
        ]);

        const contests = [
            ...parseCodechef(codechefResponse.data.future_contests || []),
            ...parseLeetcode(leetcodeResponse.data.data.topTwoContests || []),
            ...parseCodeforces(codeforcesResponse.data.result || [])
        ];

        const sortedContests = contests.sort((a, b) => a.startTime - b.startTime);

        res.json(sortedContests);
    } catch (error) {
        console.error('Error fetching contests:', error);
        res.status(500).json({ 
            error: 'Failed to fetch contests',
            message: error.message 
        });
    }
});

router.get('/past', async (req, res) => {
    try {
        const codechefRequest = axios.post('https://www.codechef.com/api/list/contests/all', {
                sort_by: 'END',
                sorting_order: 'desc',
                offset: 0,
                mode: 'all'
            }, {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const codeforcesRequest = axios.get('https://codeforces.com/api/contest.list');

        const [codechefResponse, codeforcesResponse] = await Promise.all([
            codechefRequest,
            codeforcesRequest
        ]);

        const contests = [
            ...parseCodechef(codechefResponse.data.past_contests || []),
            ...parseCodeforces(codeforcesResponse.data.result || [], true)
        ];

        const sortedContests = contests.sort((a, b) => b.endTime - a.endTime);

        res.json(sortedContests);
    } catch (error) {
        console.error('Error fetching past contests:', error);
        res.status(500).json({ 
            error: 'Failed to fetch past contests',
            message: error.message 
        });
    }
});

router.get('/:platform', async (req, res) => {
    const platform = req.params.platform.toLowerCase();
    const isPast = req.query.past === 'true';

    try {
        let contests = [];
        
        switch (platform) {
            case 'codechef':
                const codechefResponse = await axios.post(
                    'https://www.codechef.com/api/list/contests/all',
                    {
                        sort_by: isPast ? 'END' : 'START',
                        sorting_order: isPast ? 'desc' : 'asc',
                        offset: 0,
                        mode: 'all'
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                contests = parseCodechef(isPast ? (codechefResponse.data.past_contests || []) : (codechefResponse.data.future_contests || []));
                break;

            case 'leetcode':
                if (!isPast) {
                    const leetcodeResponse = await axios.post(
                        'https://leetcode.com/graphql',
                        {
                            query: `{
                                topTwoContests {
                                    title
                                    startTime
                                    duration
                                    cardImg
                                    titleSlug
                                }
                            }`
                        },
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                    contests = parseLeetcode(leetcodeResponse.data.data.topTwoContests || []);
                }
                break;

            case 'codeforces':
                const codeforcesResponse = await axios.get('https://codeforces.com/api/contest.list');
                contests = parseCodeforces(codeforcesResponse.data.result || [], isPast);
                break;

            default:
                return res.status(400).json({
                    error: 'Invalid platform',
                    message: `Supported platforms: codechef, leetcode, codeforces`
                });
        }

        const sortedContests = contests.sort((a, b) => 
            isPast ? b.endTime - a.endTime : a.startTime - b.startTime
        );
        
        res.json(sortedContests);

    } catch (error) {
        console.error(`Error fetching ${platform} contests:`, error);
        res.status(500).json({
            error: `Failed to fetch ${platform} contests`,
            message: error.message
        });
    }
});

module.exports = router;