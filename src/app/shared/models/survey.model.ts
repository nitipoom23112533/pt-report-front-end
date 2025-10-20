export interface SurveyResponse {
  result: {
    elements: SurveyElement[];
    nextPage: string;
  };
  meta: {
    httpStatus: string;
    requestId: string;
    notice: string;
  };
}

export interface SurveyElement {
  id: string;
  name: string;
  ownerId: string;
  lastModified: string;   // ใช้ string เพราะ API ส่งเป็น ISO date เช่น "2019-08-24T14:15:22Z"
  creationDate: string;   // เช่นเดียวกัน
  isActive: boolean;
}

export interface SurveyDetailDB {
    surveyId: string
    surveyName: string
    isActive: boolean
}