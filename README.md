Followed tutorial at https://docs.microsoft.com/en-gb/graph/tutorials/node  
  
Create .env at same level at this file with the following content:  
  
OAUTH_APP_ID=WHATEVER_YOUR_APP_ID_IS  
OAUTH_APP_PASSWORD=WHATEVER_YOUR_APP_PASSWORD_IS  
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback  
OAUTH_SCOPES='profile offline_access user.read calendars.read'  
OAUTH_AUTHORITY=https://login.microsoftonline.com/common  
OAUTH_ID_METADATA=/v2.0/.well-known/openid-configuration  
OAUTH_AUTHORIZE_ENDPOINT=/oauth2/v2.0/authorize  
OAUTH_TOKEN_ENDPOINT=/oauth2/v2.0/token  