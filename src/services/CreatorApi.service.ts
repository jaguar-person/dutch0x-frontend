import { Profile as UpdateCreatorDto } from '@/types/profile';
import Service from '.';

export default class CreatorApi extends Service<any> {
  constructor() {
    super('/creator');
  }

  public updateCreator(id: string, creatorData: UpdateCreatorDto) {
    return this.putRequest(`/${id}`, creatorData);
  }
}
