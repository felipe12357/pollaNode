import { CronJob } from "../../utils/cron.adapter";
import { MatchService } from "./match.service";

export class MatchCronProcess {
  
  static updateMatchResult() {
    const instance = new MatchCronProcess();
    const cronJob = new CronJob();
    cronJob.getTask(instance.updateMatch).start();
  }

  private async updateMatch() {
    const API_URL ='http://api.football-data.org/v4';
    const WORLD_CUP_ID = 2000;
    const matchService = new MatchService();
    const result = await matchService.getUnFinishByDate();

    if(result.length > 0) {
        const today = new Date('2026-06-11');
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const url = new URL(`${API_URL}/competitions/${WORLD_CUP_ID}/matches`);
        url.searchParams.append('dateFrom', today!.toISOString().split('T')[0]!);
        url.searchParams.append('dateTo', tomorrow.toISOString().split('T')[0]!);

        const response = await fetch(url, { headers: {
            'X-Auth-Token': 'a8107dc971e445eb9a7942c8a3e27941'
        }});

        if(response.ok) {
            const data = await response.json();
            console.log(data.matches);
        }
    }
    
  }
}