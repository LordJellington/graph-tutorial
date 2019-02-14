module.exports = {

    getAccessToken: async function(req) {

        if(req.user) {
            // get the stored token
            var storedToken = req.user.oauthToken;

            if(storedToken) {

                if(storedToken.expired()) {
                    //refresh token
                    var newToken = await storedToken.refresh();

                    //update stored token
                    req.user.oauthtoken = newToken;
                    return newToken.token.access_token;
                }
                
                //the existing token doesn't need renewing, so return it
                return storedToken.token.access_token;
            }
        }

    }

};