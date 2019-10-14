import axios from 'axios';

const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const instance = axios.create({
  baseURL: origin + '/api',
});

origin && instance.interceptors.response.use((response) => {
  const { data } = response;

  if (typeof data === 'object') {
    let serialized = JSON.stringify(data);
    serialized = serialized.replace(/(\/img)/g, origin + '$1');
    response.data = JSON.parse(serialized);
  }

  return response;
});

export default instance;
