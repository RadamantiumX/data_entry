import { format } from 'date-fns'
import fsPromises from 'fs/promises'
import { v4 as uuid } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import dotenv from 'dotenv';

dotenv.config()

const FILENAME = fileURLToPath(__filename)
const DIRNAME = path.dirname(FILENAME)


export const loggerTask = async () => {
    const formatDate = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${formatDate}\t${uuid()}\tthis is a simple message\n`
    try{
        await fsPromises.appendFile(path.join())

    }catch(error){

    }
}