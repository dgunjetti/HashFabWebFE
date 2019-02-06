
if (process.env.REACT_APP_PRODUCTION) {
  module.exports = {
    'facebookAuth' : {
      'clientID'  : '1655415464511468',
      'callbackURL'     : 'https://hashfab.in/login',
    },
    'googleAuth' : {
      'clientID'  : '955596765274-c3g2pfp32qk74t9soghdfd3u93tabcpo.apps.googleusercontent.com',
  	},
    'apiServer' : 'ab55ec877212411e99c2f02345d219de-1898918609.ap-south-1.elb.amazonaws.com',
  };
} else {
  module.exports = {
    'facebookAuth' : {
      'clientID'  : '396443090766046',
      'callbackURL'     : 'https://localhost:3000/login',
    },
    'googleAuth' : {
      'clientID'  : '955596765274-c3g2pfp32qk74t9soghdfd3u93tabcpo.apps.googleusercontent.com',
    },
    'apiServer' : 'localhost:3001',
  };
}
