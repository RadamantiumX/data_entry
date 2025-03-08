export interface IPayload {
    id: string
    username: string,
    currentDate: string
}

export interface UserColab {
    id: string,
    username: string,
    email:string,
    password: string,
    lastSignIn: string,
    createdAt: string
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