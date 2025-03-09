export interface IPayload {
    id: string
    username: string,
    currentDate: string
}

export enum Role {
    Admin = "admin",
    SuperAdmin= "super-admin"
}

export interface UserColab {
    id: string,
    username: string,
    email:string,
    password: string,
    lastSignIn: string,
    createdAt: string,
    role: Role | null
}

export interface Datum {
    id: number,
    emailSource: string,
    emailSourcePsw: string,
    xUser: string,
    xPsw: string,
    userColabId: string,
    createdAt: string,
    updatedAt: string
}

export interface ApiData {
    id: number,
    appName: string,
    appId: string,
    dataId: number,
    createdAt: string,
    updatedAt: string
}

export interface ApiKey {
    id: number,
    apiKey: string,
    apiKeySecret: string,
    bearerToken: string,
    accessToken: string,
    accessTokenSecret: string
    apiDataId: number,
    dataId: number,
    createdAt: string,
    updatedAt: string
}