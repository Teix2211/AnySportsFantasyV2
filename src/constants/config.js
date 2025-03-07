export const API_CONFIG = {
    development: 'http://localhost:5000/api',
    production: 'https://anysportsfantasy-api-cde902d6a36d.herokuapp.com/api'
  };
  
  export const API_URL = __DEV__ ? API_CONFIG.development : API_CONFIG.production;