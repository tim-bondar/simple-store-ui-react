const {ENV_API_URL} = process.env;

export const API_URL = ENV_API_URL || 'http://localhost:8080/';
