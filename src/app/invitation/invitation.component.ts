import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormArray, FormBuilder ,FormControl,ReactiveFormsModule,FormGroup } from '@angular/forms';  // นำเข้า FormsModule
import * as XLSX from 'xlsx';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';  // นำเข้า MatIconModule
import { MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDatepickerModule,MatButtonModule
    ,MatInputModule,MatFormFieldModule,MatIconModule,MatNativeDateModule,ReactiveFormsModule,
  ],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css',
  providers: [
    DatePipe
  ]
})
export class InvitationComponent {
  usageSegment : any;
  invitationCount : any;
  usageSegmentArray: any[] = []; // ใช้ array แทน
  GenderArray: any[] = []; // ใช้ array แทน
  AgeRangeArray: any[] = []; // ใช้ array แทน
  CustomerSegmentArray: any[] = []; // ใช้ array แทน
  OccupationArray: any[] = []; // ใช้ array แทน
  isLoading: boolean = false; // เพิ่มตัวแปร isLoading
  isAlert: boolean = true;
  totalSum: number = 0;
  Customer_proflie: any[] = ['Usage Segment','Gender','Age Range','Customer & Lift Segment','Occupation']
  categoryPrefixes = ['PT01', 'PT02', 'PT03', 'PT05', 'PT06', 'PT08', 'PT09', 'PT10', 'PT15', 'PT16', 'PT17', 'PT18','PT19', 'PT20', 'PT21'];
  categoryNames: { [key: string]: string } = {
    'PT01': 'G-Wallet',
    'PT02': 'เป๋าตังเปย์',
    'PT03': 'กระเป๋าสุขภาพ',
    'PT05': 'สลากดิจิทัล',
    'PT06': 'วอลเล็ต สบม.',
    'PT08': 'Gold Wallet',
    'PT09': 'บัญชีกรุงไทยที่ผูกไว้กับแอปฯเป๋าตัง',
    'PT10': 'Play Card',
    'PT15': 'สมัครสินเชื่อกรุงไทยออนไลน์',
    'PT16': 'บัญชีเงินฝากเป๋ามีตัง',
    'PT17': 'สลากหกหลัก',
    'PT18': 'สลากตัวเลขสามหลัก',
    'PT19': 'ขอรับใบอนุญาตขับรถระหว่างประเทศ (KlubRoad)',
    'PT20': 'ประกันรถยนต์',
    'PT21': 'ชำระภาษีรถประจำปี (KlubRoad)'

  };
  usagesegmentSuffix: { [key: string]: string } = {
    'Low': 'L',
    'Medium': 'M',
    'High': 'H',
    'Login Only': 'LO',
    'Screen View Only': 'SVO',
    'Inactive': 'I',
    'New User': 'NU',
    'N/A': 'NULL',
  };
  genderSuffix: { [key: string]: string } = {
    'Female': 'Female',
    'Male': 'Male',
    'N/A': 'GNULL',
  };
  agerangeSuffix: { [key: string]: string } = {
    'ต่ำกว่า 22': 'Age1',
    '22 - 25': 'Age2',
    '26 - 30': 'Age3',
    '31 - 40': 'Age4',
    '41 - 45': 'Age5',
    '46 - 50': 'Age6',
    '51 - 60': 'Age7',
    'มากกว่า 60 ปี': 'Age8',
    'N/A': 'AgeNULL',
  };
  customersegmentSuffix: { [key: string]: string } = {
    'PRECIOUSPLUS': 'CS02',
    'PRECIOUS': 'CS03',
    'PREWEALTH': 'CS04',
    'AFFUIENTTOBE': 'CS05',
    'RETIREPLANNER': 'CS06',
    'BUILDUPFORFEATURE': 'CS07',
    'FAMILYFOCUS': 'CS08',
    'EARLYINCAREER': 'CS09',
    'LOWERMASS': 'CS10',
    'STUDENT': 'CS11',
    'RETIREHIGHWEALTH': 'CS12',
    'RETIREMEDIUMWEALTH': 'CS13',
    'RETIRELOWWEALTH': 'CS14',
    'NEWCUST3MTH': 'CS18',
    'OTH': 'CS99',
    'N/A': 'CSNULL',
    // new
    'Career Starter - Lower': 'CSL',
    'Career Starter - Middle': 'CSM',
    'Career Starter - Upper': 'CSU',
    'Children/Student': 'CS',
    'Future Builder': 'FB',
    'Lower Mass': 'LM',
    'Mass - Lower': 'ML',
    'Mass - Middle': 'MM',
    'Mass - Upper': 'MU',
    'Pre-Senior': 'PS',
    'Senior - Lower': 'SL',
    'Senior - Upper': 'SU',
    'University Student': 'US',
    'Wealth-to-be': 'WTB',
    'Wealth Potentail': 'WP',
    'Wealth': 'W',
  };
  occupationSuffix: { [key: string]: string } = {
    'Gov & State Enterprise': 'GOV',
    'Mass-Unidentify': 'Mass',
    'N/A': 'NA',
    'Salary': 'Salary',
    'Self Employ (sSME)': 'SE',
    'Student': 'STD',
    // 'Wealth': 'Wealth',
    'Wealth(AUM<50 MB)': 'Wealth',
    'Welfare': 'Welfare',
    'N/A System': 'OCNULL',
  };

  startDate: string = '';  // ประกาศตัวแปร startDate
  endDate: string = '';    // ประกาศตัวแปร endDate
  selectedDateType: string = 'invitationDate'; // ตั้งค่าเริ่มต้นเป็น 'invitationDate'
  selected1InvPProfile = 0; // ตั้งค่าเริ่มต้นเป็น 0
  selectedAllProfile = 0; // ตั้งค่าเริ่มต้นเป็น 0
  constructor(private apiService: ApiService ,private datePipe: DatePipe){}

  ngOnInit(): void {
    const today = new Date();
    // หาวันแรกของเดือน
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split('T')[0]; // yyyy-MM-dd
    
    // หาวันสุดท้ายของเดือน
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0]; // yyyy-MM-dd
  
    this.startDate = firstDay;
    this.endDate = lastDay;
  
    // โหลดข้อมูลเมื่อ component โหลดเสร็จ
    // this.fetchData();
    
  }

  fetchData() {
    if (!this.startDate || !this.endDate) {
      alert('กรุณากรอกวันที่ให้ครบ');
      return;
    }
    if (!this.selectedDateType) {
      alert('กรุณาเลือกประเภท');
      return;
    }
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') ?? '';
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') ?? '';
    this.isLoading = true;  // เริ่มโหลดข้อมูล
    this.apiService.getFilteredData(formattedStartDate, formattedEndDate,this.selectedDateType,this.selected1InvPProfile,this.selectedAllProfile).subscribe({
      next: (count) => {
        this.invitationCount = count.wallet_type;
        this.usageSegment = count.occupation;
        this.usageSegmentArray = ['High','Medium','Low','Login Only','Screen View Only','Inactive','New User','N/A','Total']
        this.GenderArray = ['Female','Male','N/A','Total'];
        this.AgeRangeArray = ['ต่ำกว่า 22','22 - 25','26 - 30','31 - 40','41 - 45','46 - 50','51 - 60','มากกว่า 60 ปี','N/A','Total'];
        this.CustomerSegmentArray = ['PRECIOUSPLUS','PRECIOUS','PREWEALTH','AFFUIENTTOBE','RETIREPLANNER','BUILDUPFORFEATURE',
          'FAMILYFOCUS','EARLYINCAREER','LOWERMASS','STUDENT','RETIREHIGHWEALTH','RETIREMEDIUMWEALTH','RETIRELOWWEALTH','NEWCUST3MTH','OTH',
          'Career Starter - Lower','Career Starter - Middle','Career Starter - Upper','Children/Student','Future Builder','Lower Mass','Mass - Lower','Mass - Middle',
          'Mass - Upper','Pre-Senior','Senior - Lower','Senior - Upper','University Student','Wealth-to-be','Wealth Potentail','Wealth','N/A','Total'];
        this.OccupationArray = ['Gov & State Enterprise','Mass-Unidentify','N/A','Salary','Self Employ (sSME)','Student','Wealth(AUM<50 MB)','Welfare','N/A System','Total'];
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
      complete: () => {
        this.isLoading = false; // ปิด loading เมื่อข้อมูลโหลดเสร็จ
        this.isAlert = false;
      }
    });

  }
  exportToExcel() {
    // ค้นหาทุกตารางในหน้า
    const tables = document.querySelectorAll('table');
    // สร้าง workbook ใหม่
    const wb = XLSX.utils.book_new();
    // ทำงานกับแต่ละตาราง
    tables.forEach((table, index) => {
      // แปลงข้อมูลตารางเป็น JSON
      const ws = XLSX.utils.table_to_sheet(table as HTMLTableElement);
      // const header = table.querySelector('thead tr th');
      // const sheetName = header ? header.textContent?.trim() : `Sheet${index + 1}`;
      // // เพิ่ม sheet ลงใน workbook โดยใช้ชื่อที่แตกต่างกัน
      // XLSX.utils.book_append_sheet(wb, ws, sheetName);

      const header = table.querySelector('thead tr th');
      let rawName = header ? header.textContent?.trim() || `Sheet${index + 1}` : `Sheet${index + 1}`;

      // ✅ ดึงเฉพาะข้อความในวงเล็บ (ถ้ามี)
      let sheetName = rawName;
      const match = rawName.match(/\(([^)]+)\)/); 
      if (match) {
        sheetName = match[1].trim(); // ข้อความในวงเล็บ
      }

      // ตัดชื่อให้ไม่เกิน 31 ตัวอักษร
      if (sheetName.length > 31) {
        sheetName = sheetName.substring(0, 31);
      }

      // กันชื่อซ้ำ
      if (wb.SheetNames.includes(sheetName)) {
        sheetName = sheetName.substring(0, 28) + '_' + (index + 1);
      }

      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });
    // สร้างไฟล์ Excel และดาวน์โหลด
    const currentDate = new Date().toISOString().split('T')[0];  // format yyyy-mm-dd
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') ?? '';
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') ?? '';
    const fileNmae = 'Invitation' + '_' + formattedStartDate+' to '+ formattedEndDate + '.xlsx';
    XLSX.writeFile(wb, fileNmae);
  }

  calculateTotal(invitationCount: any, prefix: string, keys: string[]): number {
    if (!invitationCount) return 0;
    return keys.reduce((sum, key) => sum + (invitationCount[`${prefix}${key}`] || 0), 0);
  }

  calculateTotalrow(invitationCount: any, prefixes: string[], suffix: string): number {
    if (!invitationCount) return 0; // ป้องกันค่า null หรือ undefined
    return prefixes.reduce((sum, prefix) => {
      const value = invitationCount[prefix + suffix] || 0; // ดึงค่าจาก object หรือให้เป็น 0 ถ้าไม่มีค่า
      return sum + value;
    }, 0);
  }

  calculateTotalSum(invitationCount: any, categoryPrefixes: string[], usagesegmentSuffixArray: string[]): number {
    this.totalSum = usagesegmentSuffixArray.reduce((total, item) => {
      return total + this.calculateTotalrow(invitationCount, categoryPrefixes, item);
    }, 0);
    return this.totalSum;
  }

  onDateTypeChange(type: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedDateType = isChecked ? type : ''; // ถ้าไม่เลือกอะไร ให้กลับมาเป็น invitationDate
  }
  onInviPerProfileChange(type: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selected1InvPProfile = isChecked ? type : 0; // ถ้าไม่เลือกอะไร ให้กลับมาเป็น invitationDate
  }
  onAllProfileChange(type: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedAllProfile = isChecked ? type : 0; // ถ้าไม่เลือกอะไร ให้กลับมาเป็น invitationDate
  }
}
  
