const path = require('path');

module.exports = {
  // Autres options de configuration Webpack...
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },
};
