import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';  // นำเข้า AuthService
import { SurveyResponse,SurveyDetailDB } from '../shared/models/survey.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiUrl = 'http://localhost:8080'; // URL ของ backend
  apiUrl = environment.apiURL
  baseUrl = environment.qualtricsConfig.baseUrl;
  apiToken = environment.qualtricsConfig.apiToken;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ฟังก์ชันสำหรับเรียก API และรับข้อมูล
  getFilteredData(startDate: string, endDate: string, dateType: string, selected1InvPProfile: number,selectedAllProfile: number): Observable<any> {
    const token = this.authService.getToken(); // ดึง JWT Token
  
    let params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate)
      .set('date_type', dateType)
      .set('selected1InvPProfile', selected1InvPProfile)
      .set('selectedAllProfile', selectedAllProfile);


  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/pt-report/invitation`, {
      params,
      headers: headers // <-- ต้องใช้ headers แบบนี้
    });
  }
  getFilteredDataTransaction(startDate: string, endDate: string,selectedAllProfile: number): Observable<any> {
    const token = this.authService.getToken(); // ดึง JWT Token
    let params = new HttpParams()
    .set('start_date', startDate)
    .set('end_date', endDate)
    .set('selectedAllProfile', selectedAllProfile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/pt-report/transaction`,{ params,headers: headers })
  }

  getSurveysList(nextPageUrl?: string): Observable<SurveyResponse> {
    const headers = new HttpHeaders({ 'X-API-TOKEN': this.apiToken });
    const url = nextPageUrl ? nextPageUrl : `${this.baseUrl}/surveys`;
    return this.http.get<SurveyResponse>(url, { headers });
  }

  getSurveyDB(): Observable<SurveyDetailDB[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<SurveyDetailDB[]>(`${this.apiUrl}/pt-report/surveyDb`,{headers: headers })
  }
  changeSurveyDB(newSurvey: SurveyDetailDB): Observable<SurveyDetailDB> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<SurveyDetailDB>(`${this.apiUrl}/pt-report/updatesurveyDb`,newSurvey,{headers: headers })

  }
}



