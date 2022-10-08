import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';

@Injectable()
export class GeneralService {
  static raiseError(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    if (statusCode == HttpStatus.BAD_REQUEST)
      throw new ForbiddenException(message);
    else throw new HttpException(message, statusCode);
  }

  static serviceResult(message, data) {
    return { data, message };
  }
}
