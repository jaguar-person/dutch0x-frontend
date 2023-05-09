import { Profile as ProfileDto } from '@/types/profile';
import Service from '.';

export default class CreatorApi extends Service<any> {
  constructor() {
    super('/creator');
  }

  public updateCreator(id: string, creatorData: ProfileDto) {
    try {
      return this.putRequest(`${id}`, creatorData);
    } catch (e) {
      console.log(e);
    }
  }

  public createProfile(creatorData: ProfileDto) {
    return this.postRequest('', creatorData);
  }

  public checkEmailExists(email: string) {
    return this.getRequest('/check-email', email);
  }

  public checkUsernameExists(username: string) {
    return this.getRequest('/check-username', username);
  }

  public getProfile(account: string) {
    return this.getRequest(`profile/${account}`);
  }

  public changeNotificationsSettings(address: string, value: boolean) {}
}
