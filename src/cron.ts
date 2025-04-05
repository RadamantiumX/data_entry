import cron from 'node-cron'
// TODO: for the next project---> Apply CRON JOBS to remove records on DB when having pass 24 hs
// Space into *
cron.schedule('* * * * *', async ()=>{
    console.log('Runing every minute')
})