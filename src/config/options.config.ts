import { CookieOptions } from "express"

// TODO: Adding more properties in to options: 
/**
 * Example full Options properties:
 * 
 *  eg = {
 *      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        httpOnly: true,           // JavaScript can't access it
        secure: true,             // only over HTTPS
        sameSite: 'Strict',       // prevent CSRF (or use 'Lax'/'None')
        path: '/refresh-token'    // limit cookie to specific route
 *    }
   Set the cookie options to send on response
 * @param {Date} expires 
 * @returns {CookieOptions}
 */

export const cookieOptions = (expires:Date):CookieOptions => {
   const options = {
     expires: expires,
     httpOnly: true,
     
   }
   return options
}