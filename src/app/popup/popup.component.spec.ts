import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { ApiService } from '../api.service';
import { AuthService } from '../service/auth.service';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  let apiService: jasmine.SpyObj<ApiService>;
  let toastrService: ToastrService;
  
  beforeEach(() => {


    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['GetCoursebycode', 'UpdateCourse', 'CreateCourse']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'warning']);


    TestBed.configureTestingModule({
      declarations: [PopupComponent],
      imports:[HttpClientTestingModule,ToastrModule.forRoot(),
        MatDialogModule,MatCardModule,
        MatFormFieldModule, ReactiveFormsModule,MatInputModule, BrowserAnimationsModule],
      providers:[ { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef,useValue: {}},
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },]
    });
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    toastrService = TestBed.inject(ToastrService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set form validity correctly', () => {
    component.courseform.setValue({
      id: '1',
      coursename: 'Sample Course',
      courseduration:'10',
      coursedescription: 'Sample Description',
      technology: 'Sample Technology',
      launchurl: 'Sample URL',
    });

    expect(component.courseform.valid).toBeTruthy();
  });

  // it('should call ApiService for creating course data', () => {
  //   const sampleData = {
  //     id: '1',
  //     coursename: 'Sample Course Name',
  //     courseduration: '5', 
  //     coursedescription: 'Sample Description',
  //     technology: 'Sample Technology',
  //     launchurl: 'https://sample-url.com',
  //     // Add other properties here
  //   };
  //   // apiService.GetCoursebycode.and.returnValue(of(sampleData));
  //   apiService.CreateCourse.and.returnValue(of({}));

  //   component.ngOnInit();
  //   component.SaveCourse();

  //   expect(apiService.CreateCourse).toHaveBeenCalledWith(component.courseform.value);
  //   expect(toastrService.success).toHaveBeenCalledWith('Saved Details Successfully');
  // });

});
