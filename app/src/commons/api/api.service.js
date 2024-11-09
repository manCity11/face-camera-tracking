import axios from 'axios';
import { backends } from 'CONFIG';

export const ApiService = (() => ({
  call(config) {
    return axios({
      ...config,
      url: `${backends.arduinoApiUrl}${config.url}`,
      method: config.method || 'GET',
    });
  },
}))();
