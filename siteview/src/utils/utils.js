import {login} from '../request';

const utils = {
  async login (token) {
    if (token && typeof token === 'string' && token.trim()) {
      const result = await login(token);
      return result;
    }
  }
}

export default utils;