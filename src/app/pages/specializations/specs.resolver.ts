import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {GeneralInfoService} from "../../services/general-info.service";
import {SpecializationService} from "../../services/specialization.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SpecsResolver implements Resolve<any> {

  constructor(
    private generalInfoService: GeneralInfoService,
    private specializationService: SpecializationService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let specTitleReq = this.generalInfoService.getInfo("specTitle");
    let contactBannerReq = this.generalInfoService.getInfo("contactBanner");
    let specsReq = this.specializationService.getSpecializations()



    return forkJoin({
      specTitle: specTitleReq,
      contactBanner: contactBannerReq,
      specs: specsReq
    });
  }

  }
