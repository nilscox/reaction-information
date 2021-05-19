import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/modules/user/user.entity';

import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request.entity';
import { CommentsAreaRequestInDto } from './dtos/comments-area-request-in.dto';

@Injectable()
export class CommentsAreaRequestService {
  constructor(
    @InjectRepository(CommentsAreaRequest)
    private readonly commentsAreaRequestRepository: Repository<CommentsAreaRequest>,
  ) {}

  async findRequest(requestId: number) {
    return this.commentsAreaRequestRepository.findOne(requestId);
  }

  async findRequestsPaginated(page: number, pageSize: number) {
    return this.commentsAreaRequestRepository.findAndCount({
      where: {
        status: CommentsAreaRequestStatus.PENDING,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async request(dto: CommentsAreaRequestInDto, requester: User): Promise<CommentsAreaRequest> {
    return this.commentsAreaRequestRepository.save({
      ...dto,
      status: CommentsAreaRequestStatus.PENDING,
      requester,
    });
  }

  async reject(request: CommentsAreaRequest, moderator: User): Promise<void> {
    await this.commentsAreaRequestRepository.update(request.id, {
      status: CommentsAreaRequestStatus.REJECTED,
      moderator,
    });
  }
}
