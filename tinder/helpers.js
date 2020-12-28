const fs = require('fs');
const { promisify } = require('util');

const loadEntities = async (entities, path) => {
    // loads entities to file
    await promisify(fs.writeFile)(path, JSON.stringify(entities, null, 4));
  };
  
// extract old entities
const extractKnownEntities = async (path) => JSON.parse(await promisify(fs.readFile)(path));

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const matchesParams =  {
"headers": {
    "accept": "application/json",
    "app-session-id": "1f88ca8f-55e5-4267-996f-dc26ef5622f6",
    "app-session-time-elapsed": "602",
    "app-version": "1026700",
    "persistent-device-id": "4661329b-7b40-41e4-a8b9-d3551fa582aa",
    "platform": "web",
    "tinder-version": "2.67.0",
    "user-session-id": "cc6d8280-7afe-4b7e-93fe-7ff6bc59a5e3",
    "user-session-time-elapsed": "496",
    "x-auth-token": "502578ef-9eb0-4b38-8c41-44aaab66179e",
    "x-supported-image-formats": "jpeg"
    },
    "referrer": "https://tinder.com/",
    "referrerPolicy": "origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
};

  const messagesParams = {
    "headers": {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9",
        "app-session-id": "1f88ca8f-55e5-4267-996f-dc26ef5622f6",
        "app-session-time-elapsed": "1277638",
        "app-version": "1026700",
        "persistent-device-id": "4661329b-7b40-41e4-a8b9-d3551fa582aa",
        "platform": "web",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "tinder-version": "2.67.0",
        "user-session-id": "95579150-163d-4769-94f9-b318068ab2fa",
        "user-session-time-elapsed": "1277599",
        "x-auth-token": "502578ef-9eb0-4b38-8c41-44aaab66179e",
        "x-supported-image-formats": "jpeg"
      },
      "referrer": "https://tinder.com/",
      "referrerPolicy": "origin",
      "body": null,
      "method": "GET",
      "mode": "cors"
    };

module.exports = {
    loadEntities,
    extractKnownEntities,
    sleep,
    matchesParams,
    messagesParams,
};