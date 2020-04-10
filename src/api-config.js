let serverEndpoint;

const hostname = window && window.location && window.location.hostname;

// if(hostname === 'localhost') serverEndpoint = 'http://localhost:8000';
// else
serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:8000';

export const SERVER_ENDPOINT = serverEndpoint;