import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {GeneralInfoService} from "../../services/general-info.service";
import {TeamMemberService} from "../../services/team-member.service";
import {AboutUsPageDetails} from "../../interfaces/about-us-page-details";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AboutUsResolver implements Resolve<AboutUsPageDetails> {

  constructor(
    private generalInfoService: GeneralInfoService,
    private teamMemberService: TeamMemberService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AboutUsPageDetails> {
    return forkJoin({
      aboutUs: this.generalInfoService.getInfo("aboutUs"),
      ourTeamTitle: this.generalInfoService.getInfo("team"),
      teamMembers: this.teamMemberService.getTeamMembers()
    });
  }

}
