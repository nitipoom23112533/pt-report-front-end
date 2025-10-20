import { Component,HostListener  } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SurveyElement,SurveyDetailDB } from '../shared/models/survey.model';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-survey-adhoc',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './survey-adhoc.component.html',
  styleUrl: './survey-adhoc.component.css'
})
export class SurveyAdhocComponent {

  constructor(
    private apiService: ApiService

  ) { }
  surveys: SurveyElement[] = [];
  surveyDetailDB: SurveyDetailDB[] = [];
  newSurveyDetailDB: SurveyDetailDB = { surveyId: '', surveyName: '', isActive: false };

  isOpen = false;
  isLoading = false; // เพิ่มตัวแปร isLoading

  ngOnInit(): void {
    this.isLoading = true;
    this.loadAllSurveys();
    this.apiService.getSurveyDB().subscribe(res => {
      this.surveyDetailDB = res;
    });
    setTimeout(() => {
        this.isLoading = false;
    }, 1000); 
  }

  loadAllSurveys(nextPageUrl?: string) {
    this.apiService.getSurveysList(nextPageUrl).subscribe(res => {
      this.surveys = [...this.surveys, ...res.result.elements];

      if (res.result.nextPage) {
        this.loadAllSurveys(res.result.nextPage);
      }

      this.surveys = this.surveys.filter(survey => survey.isActive !== false);
    });
  }

  openForm() {
    if (this.isOpen === true) {
      this.isOpen = false;
      return;
    }
    this.isOpen = true;
  }

  closeForm() {
    this.isOpen = false;
  }
   async onSubmit(form: any) {
    if (form.invalid) {
      return;
    }
    const selected: SurveyElement = form.value.survey; // ได้ object ทั้งก้อน
     this.newSurveyDetailDB = {
      surveyId: selected.id,
      surveyName: selected.name,
      isActive: true,
    };

    await firstValueFrom(this.apiService.changeSurveyDB(this.newSurveyDetailDB))
    this.closeForm()
    this.surveys = [];
    this.newSurveyDetailDB = { surveyId: '', surveyName: '', isActive: false };
    this.ngOnInit()
  }

}
