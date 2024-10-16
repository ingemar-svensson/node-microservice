// src/grpc/grpcServer.ts
import { Server, ServerCredentials } from '@grpc/grpc-js';
import config from '../utils/config';
import { UserServiceService } from './types/user';

export const startGrpcServer = () => {
  const server = new Server();
  //server.addService(UserServiceService, UserServiceServer);

  server.bindAsync(
    `0.0.0.0:${config.grpcPort}`,
    ServerCredentials.createInsecure(),
    () => {
      console.log(`gRPC server running at http://localhost:${config.grpcPort}`);
    }
  );
};
