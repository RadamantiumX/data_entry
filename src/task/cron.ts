import cron from 'node-cron'

// Space into *
cron.schedule('* * * * *', async ()=>{
    console.log('Runing every minute')
})