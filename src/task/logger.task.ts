import { format } from 'date-fns'
import fsPromises from 'fs/promises'
import { v4 as uuid } from 'uuid'
import path from 'path'
// import { fileURLToPath } from 'url'



const FILENAME = __filename
const DIRNAME = path.dirname(FILENAME)

/**
 * Logger script to generate diferents LOGS, for eg. The Throw Errors
 * @param {string} message The error details
 * @param {string} fileName The descriptive name of the file
 * @returns {Promise<void>}
 */

export const loggerTask = async (message:string, fileName:string):Promise<void> => {
    const formatDate = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${formatDate}\t${uuid()}\t${message}\n`
    try{
        await fsPromises.appendFile(path.join(DIRNAME,'..','/logs', fileName ), logItem)
        return
    }catch(error){
     console.log(error)
    }
}