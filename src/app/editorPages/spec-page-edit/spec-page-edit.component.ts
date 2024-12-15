import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SpecializationDetails} from "../../interfaces/specialization-details";
import {SpecializationService} from "../../services/specialization.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-spec-page-edit',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './spec-page-edit.component.html',
  styleUrl: './spec-page-edit.component.scss'
})
export class SpecPageEditComponent implements OnInit  {
  specializationList!: SpecializationDetails[];

  constructor(
    private specializationService: SpecializationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.loadSpecializations()
  }

  private loadSpecializations() {
    this.specializationService.getSpecializations(false, environment.defaultLanguage).subscribe(
      (data: SpecializationDetails[]) => {
        this.specializationList = data;
      }
    );
  }

  goToSpecializationPage(item: SpecializationDetails) {
    this.router.navigate([item.id], {relativeTo: this.route});
  }

  deleteAllPages(item: SpecializationDetails) {
    if(confirm("Napewno usunąć wszystkie strony? No way back!")){
      this.specializationService.deleteSpecializationPage(item.id).subscribe({
        next: ()=>{
          alert("Success")
        },
        error: error =>{
          alert(error.error.message);
        }
      })
    }
  }
}
