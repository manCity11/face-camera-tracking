import { ApiService as ApiServiceModule } from '../api/api.service';

export const ArduinoApi = ((ApiService) => ({
  setPosition(data) {
    return ApiService.call({
      url: '/camera/move',
      method: 'POST',
      data,
    });
  },
}))(ApiServiceModule);
