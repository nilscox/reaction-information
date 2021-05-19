import { Expose } from 'class-transformer';

import { CommentsAreaRequestStatus } from 'src/modules/comments-area/comments-area-request/comments-area-request.entity';

export class CommentsAreaRequestDto {
  constructor(partial: Partial<CommentsAreaRequestDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  identifier: string;

  @Expose()
  status: CommentsAreaRequestStatus;
}
