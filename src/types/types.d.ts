export interface IPayload {
    id: string
    username: string,
    currentDate: string
    isSuperAdmin: boolean
}


export interface UserColab  {
    id: string,
    username: string,
    email:string | null,
    password: string,
    lastSignIn: Date | null,
    createdAt: Date,
    updatedAt: Date | null,
    isSuperAdmin: boolean
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

// Responses ⬇️
/**
 *  
 * @function {readCountRecords}
 */
export type UserColabClientResponse = {
    users: Omit<UserColab, 'password'> [];
    totalUsers: number
}

export type ApiDataClientResponse = {
    apiDatas: Pick<ApiData, "appId" | "appName" | "dataId"> [],
    totalApiData: number
}

export type ApiKeyClientResponse = {
    apiKeys: Omit<ApiKey, "id" | "createdAt" | "updatedAt"> [],
    totalApiKeys: number
}

export type DatumClientResponse = {
    data: Omit<Datum, "createdAt" | "updatedAt"> [],
    totalData: number
}

export type AllRelatedData = {
    id: number;
    emailSource: string;
    emailSourcePsw: string;
    xUser: string;
    xPsw: string;
    apiData: {
        appId: string;
        appName: string;
    } | null;
    apiKeys: {
        apiKey: string;
        apiKeySecret: string;
        bearerToken: string;
        accessToken: string;
        accessTokenSecret: string;
    } | null;
}

