import axios from 'axios';
// import Cookies from 'js-cookie';

const { VITE_PUBLIC_API } = import.meta.env;
const customFetch = axios.create({
  baseURL: `${VITE_PUBLIC_API}/api/v1`,
});

// const token = Cookies.get('dryermaster_token');
// customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export { customFetch };
