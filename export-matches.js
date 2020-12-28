const fetch = require('node-fetch');
const {
    loadEntities,
    sleep,
    matchesParams,
} = require('./helpers');

// fetch("https://api.gotinder.com/v2/matches/52e6a1ae23ca63cc2b000f3253d5eeccb85c95c5347c8c6a/messages?locale=en&count=100&page_token=MjAyMC0xMi0yOFQwMTo1NjoyNS4yODNa", );
// exports matches
const matchUrl = (token) => `https://api.gotinder.com/v2/matches?locale=en&count=60&message=1&is_tinder_u=false${token ? `&page_token=${token}`: null}`;
const messageUrl = (matchId, token) => `https://api.gotinder.com/v2/matches/${matchId}/messages?locale=en&count=100${token ? `&page_token=${token}`: null}`;
(async () => {
    let token = null;
    const allMatches = [];
    while (true) {
        const url = matchUrl(token);
        const response = await fetch(url, matchesParams);
        const { meta: { status }, data: { matches, next_page_token } } = await response.json();
        token = next_page_token;
        if (matches?.length) {
            allMatches.push(...matches);
        }
        console.info(next_page_token, status, matches?.length, allMatches.length, url);
        if (!matches?.length || parseInt(status, 10) !== 200 || !next_page_token) {
            break;
        }
        await sleep(5000);
    }
    await loadEntities(allMatches, `matches-${Date.now()}.json`);
})();
