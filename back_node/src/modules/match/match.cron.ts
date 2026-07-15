import { ApiMatch, MatchCountry } from "../../domain/entities";
import { CronJob } from "../../utils/cron.adapter";
import { MatchService } from "./match.service";

export class MatchCronProcess {

  private matchService = new MatchService();

  static updateMatchProcess() {
    const instance = new MatchCronProcess();
    const cronJob = new CronJob();
    cronJob.getTask(instance.updateMatchResults.bind(instance)).start();
  }

  private async updateMatchResults() {
    const API_URL ='http://api.football-data.org/v4';
    const WORLD_CUP_ID = 2000; // TODO manejarlo con BD
    
    try {
      const result = await this.matchService.getUnFinishByDate();

      if(result.length > 0) {
          const today = new Date(); // testing '2026-06-11'
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);

          const url = new URL(`${API_URL}/competitions/${WORLD_CUP_ID}/matches`);
          url.searchParams.append('dateFrom', today!.toISOString().split('T')[0]!);
          url.searchParams.append('dateTo', tomorrow.toISOString().split('T')[0]!);

          const response = await fetch(url, { headers: {
              'X-Auth-Token': <string> process.env.API_TOKEN
          }});

          if(response.ok) {
              const data = await response.json();
              const matchList = <ApiMatch[]>data.matches;
              result.forEach(match => this.handleSingleMatch(match, matchList))
          }
      }
    } catch (error:any) {
      console.log('nhubo unerro', error);
    }
    
  }

  private async handleSingleMatch(localMatch: MatchCountry ,apiMatchList: ApiMatch[]): Promise<void> {
    const apiMatch = apiMatchList.find(match => 
        match.homeTeam.name === localMatch.countryHome.englishName && 
        match.awayTeam.name === localMatch.countryVisitor.englishName
    );

    if (apiMatch) {
      if( apiMatch.score.duration === 'REGULAR' && apiMatch.score.winner) {
        const score = `${apiMatch.score.fullTime.home}-${apiMatch.score.fullTime.away}`;
        await this.matchService.updateResult(localMatch.id, score, localMatch.bonusPhase);
      }

      if( apiMatch.score.duration === 'PENALTY_SHOOTOUT' && apiMatch.score.winner) {
        const score = `${apiMatch.score.regularTime.home}-${apiMatch.score.regularTime.away}`;
        await this.matchService.updateResult(localMatch.id, score, localMatch.bonusPhase);
      }      
    }
  }
}