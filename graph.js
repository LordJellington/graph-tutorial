var graph = require('@microsoft/microsoft-graph-client');

module.exports = {

    getUserDetails: async function(accessToken) {
        const client = getAuthenticatedClient(accessToken);

        const user = await client.api('/me').get();
        return user;
    },

    getEvents: async function(accessToken) {
        const client = getAuthenticatedClient(accessToken);

        // the URL that will be called is /me/events
        // the select method limits the fields returned for each event to just those the view will actually use
        // the orderby method sorts the results by the date and time they were created, with the most recent item being first

        const events = await client
            .api('/me/events')
            .select('subject, organizer, start, end')
            .orderby('createdDateTime DESC')
            .get();

        return events;
    }

};

function getAuthenticatedClient(accessToken) {
    // initialiase Graph client
    const client = graph.Client.init({
        // use the provided access token to authenticate requests
        authProvider: (done) => {
            done(null, accessToken);
        }
    });

    return client;
}