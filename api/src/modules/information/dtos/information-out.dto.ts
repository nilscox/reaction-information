import { Expose, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';

export class InformationOutDto {

  @Expose()
  id: number;

  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  url: string;

  @Expose()
  @Type(() => UserLightOutDto)
  creator: UserLightOutDto;

}