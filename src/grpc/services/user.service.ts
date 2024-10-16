import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { AuthController } from '../../rest/controllers/auth.controller';
import { GetUserRequest, GetUserResponse } from '../types/user';

export class UserService {
  static GetUser(
    call: ServerUnaryCall<GetUserRequest, GetUserResponse>,
    callback: sendUnaryData<GetUserResponse>
  ) {
    const username = call.request.username;
    const user = AuthController.getUser(username);

    if (user) {
      //const response = new GetUserResponse();
      //response.username = user.username;
      //response.password = user.password;
      //callback(null, response);
    } else {
      callback(new Error('User not found'), null);
    }
  }
}
