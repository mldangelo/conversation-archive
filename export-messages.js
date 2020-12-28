const fetch = require('node-fetch');
const pLimit = require('p-limit');
const {
    loadEntities,
    extractKnownEntities,
    sleep,
    matchesParams,
} = require('./helpers');

const limit = pLimit(1); // 2 promises at a time

// exports messages
const messageUrl = (matchId, token) => `https://api.gotinder.com/v2/matches/${matchId}/messages?locale=en&count=100${token ? `&page_token=${token}`: null}`;

const saveMessages = async (id) => {
    let token = null;
    const allMessages = [];
    while (true) {
        const url = messageUrl(id, token);
        await sleep(2000);
        const response = await fetch(url, matchesParams);
        const { data: { messages, next_page_token } } = await response.json();
        if (messages?.length) {
            allMessages.push(...messages);
        }
        console.info(id, messages?.length, allMessages.length);
        if (!messages?.length || !next_page_token) {
            break;
        }
        token = next_page_token;
    }

    await loadEntities(allMessages, `data/messages/${id}-${Date.now()}.json`);
}

(async () => {
    const matches = await extractKnownEntities('/Users/mdangelo/projects/tinder/data/matches-1609151744608.json');
    await Promise.all(matches.map((match) => limit(() => saveMessages(match.id))));
})();