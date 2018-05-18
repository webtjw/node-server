import {login} from '../request';

const utils = {
  async login (token) {
    if (token && typeof token === 'string' && token.trim()) {
      const result = await login(token);
      return result;
    }
  },
  sigleSideTip: null,
  addSideTip (tip) {
    const {sigleSideTip} = utils;

    if (sigleSideTip) {
      if (!tip || !tip.text) console.error('wrong params.');
      else sigleSideTip.addTip(tip);
    } else console.error('the instance of SideTip has not been set.');
  }
}

window.utils = utils;

export default utils;