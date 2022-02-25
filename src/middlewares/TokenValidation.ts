// import { ResponseDto } from "@dto/Response.dto";
// import { AwsConfig } from "@module/utils/utils.dto";
// import { getAwsCred } from "@module/utils/utils.service";
// import * as AWS from "aws-sdk";
// import { Response, Request, NextFunction } from "express";
// import * as jwt from "jsonwebtoken";
// import { AWSSecretExceptions, SecretDataObject } from "./dto/APIAuth.dto";

// export class TokenValidation {
//   private secret: string;

//   constructor(secret: string) {
//     this.secret = secret;
//   }

//   /*
//   =========================================
//   Created On : 19/06/2019
//   Updated On : 10/09/2021
//   Implemented by : Jose<jose@buybackbazaar.com>
//   Updated by : Jihin<jihin@northladder.com>
//   Purpose: To validate session
//   =========================================
//   */
//   public validateSessionWithPermission(apiPermissions: Array<string>) {
//     return async (req: Request, res: Response, next: NextFunction) => {

//       const bearerToken: any = req.headers.authorization;
//       const xApiKey: any = req.headers['x-api-key'];

//       if (!bearerToken && !xApiKey) {
//         res.statusCode = 401;
//         return res.send({ status: false, message: "Unauthorized", error: "Invalid permissions" });
//       }

//       if (bearerToken) {
//         const [, token] = bearerToken.split(" ");

//         jwt.verify(token, this.secret, (err: any, payload: any) => {
//           if (payload) {
//             const permissionCheck = payload.permissions.filter((permission: string) => (apiPermissions.indexOf(permission) != -1));
//             if (!permissionCheck.length) {
//               res.statusCode = 403;
//               res.send({ status: false, message: "Access denied.", error: "Invalid permissions" });
//             }
//             else {
//               const userData: any = { userId: payload.userId, id: payload.id, email: payload.email, firstName: payload.firstName, lastName: payload.lastName };
//               if (payload.userType) {
//                 userData.userType = payload.userType;
//               }
//               if (payload.storeId) {
//                 userData.storeId = payload.storeId;
//               }
//               req.headers["user"] = userData;
//               req.headers["permissions"] = payload.permissions;
//               next();
//             }
//           } else {
//             res.statusCode = 401;
//             res.send({ status: false, message: "Unauthorized.", error: "Invalid permissions" });
//           }
//         });
//       } else {

//         let secretResponse: ResponseDto<any> = await this.AWSSecretManager(xApiKey as string) as ResponseDto<any>;
//         if (!secretResponse || !secretResponse.status) {
//           res.statusCode = 401;
//           return res.send(secretResponse);
//         }
//         const { permissions, user = {} } = secretResponse.data;
//         if (apiPermissions.every(v => permissions.indexOf(v) == -1)) {
//           res.statusCode = 401;
//           secretResponse = { ...secretResponse, status: false, message: "Access Denied", data: null };
//           return res.send(secretResponse);
//         }
//         req.headers["user"] = user;
//         next();
//       }
//     };
//   }


//   AWSSecretManager = async (apiKey: string) => {
//     try {
//       let secret: SecretDataObject;
//       const response: ResponseDto<any> = { status: false, message: "Authorization Invalid!" };
//       const [secretName] = apiKey.split(":");

//       const awsParams: AwsConfig = { ...getAwsCred() };
//       const CLIENT = new AWS.SecretsManager(awsParams);
//       return new Promise((resolve, reject) => {
//         CLIENT.getSecretValue({ SecretId: secretName }, function (err: any, data: any) {
//           if (err) {
//             switch (err.code) {
//               case AWSSecretExceptions.DECRYPTION_FAILED:
//               case AWSSecretExceptions.INTERNAL_SERVICE_FAILED:
//               case AWSSecretExceptions.INVALID_PARAMETER:
//               case AWSSecretExceptions.INVALID_REQUEST:
//               case AWSSecretExceptions.RESOURCE_NOT_FOUND:
//                 response.error = err.code;
//                 break;
//               default:
//                 response.error = AWSSecretExceptions.DEFAULT_EXCEPTION;
//                 break;
//             }
//             return resolve(response);
//           }
//           if (!data || !data.SecretString)
//             return resolve(response);
//           secret = JSON.parse(data.SecretString);
//           if (secret && secret["X-API-KEY"] !== apiKey.split(":")[1])
//             return resolve(response);
//           const responseData = {
//             permissions: (secret.PERMISSIONS || "").split(","),
//             user: {
//               headOfficeId: secret.HEADOFFICE_ID || "",
//               storeId: secret.STORE_ID || "",
//             }
//           };

//           return resolve({ status: true, message: "Authenticated Successfully", data: responseData });
//         });
//       });
//     }
//     catch (error) {
//       let response: ResponseDto<any> = { status: false, message: error.message || "Something went wrong.", error: error.message };
//       return response;
//     }
//   };
// }

// export default TokenValidation;
