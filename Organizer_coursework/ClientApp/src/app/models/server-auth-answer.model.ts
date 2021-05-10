export class ServerAuthAnswer {
    conteneType: string;
    serializerSettings: string;
    statusCode: string;
    value: {
        accessToken: string,
        userName: string
    }
}