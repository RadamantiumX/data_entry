import { createRecord, readCountRecords, readRecord, updateRecord, destroyRecord } from "../dal/prisma_querys/usercolab.querys"
import { UserColab } from "@prisma/client"
import { validateUser } from "../schemas/usercolab.validation"
// ❗ Errors on validations can handle on "schemas"
export const createUserColab = async (bodyReq:Pick<UserColab, "username"| "password" | "isSuperAdmin">):Promise<void> => {
    await validateUser(bodyReq)
    await createRecord(bodyReq)
    return
}

