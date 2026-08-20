import  cron, { ScheduledTask }  from  'node-cron' ;

export class CronJob {

  getTask(toDo: () => void): ScheduledTask { 
    // const task = cron.schedule('*/10 * * * * *', () => {
    const task = cron.schedule('*/20 * * * *', () => {
      const fecha = new Date();

      toDo();
      // console.log('Running every 10 minutes', fecha.toLocaleString());
    });

    return task;
  }
}