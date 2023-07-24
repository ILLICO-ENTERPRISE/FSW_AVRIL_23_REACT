import { METHOD, CONTENT_TYPE, DATAMUSE_BASE_URL } from './constants.js';

export const fetchAPI = async (search, search_key) => {
  return fetch(`${DATAMUSE_BASE_URL}/words?${search_key}=${search}`, {
    method: METHOD.GET,
    headers: { 'Content-type': CONTENT_TYPE },
  });
};
