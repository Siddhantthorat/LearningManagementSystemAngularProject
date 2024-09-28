import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { ApiService } from '../api.service';
import { AuthService } from '../service/auth.service';

import { CourselistComponent } from './courselist.component';

describe('CourselistComponent', () => {
  let component: CourselistComponent;
  let fixture: ComponentFixture<CourselistComponent>;


  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;
  

  beforeEach(() => {

    //mocking
    mockApiService = jasmine.createSpyObj('ApiService', ['Getallcourse', 'RemoveCoursebycode']);
    mockApiService.Getallcourse.and.returnValue(of([]));
    mockApiService.RemoveCoursebycode.and.returnValue(of({}));

    mockAuthService = jasmine.createSpyObj('AuthService', ['Getaccessbyrole', 'GetUserrole']);
    mockAuthService.GetUserrole.and.returnValue('admin');
    mockAuthService.Getaccessbyrole.and.returnValue(of([
      { haveadd: true, haveedit: true, havedelete: true }
    ]));

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CourselistComponent],
      imports:[HttpClientTestingModule,ToastrModule.forRoot(),
        MatDialogModule,MatCardModule,MatTableModule,
        MatFormFieldModule, ReactiveFormsModule,MatInputModule, BrowserAnimationsModule,MatPaginatorModule],
      providers:[ { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef,useValue: {}},
        { provide: ApiService, useValue: mockApiService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: Router, useValue: mockRouter }]
    });
    fixture = TestBed.createComponent(CourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

   



  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on initialization', () => {
    component.ngOnInit();
    expect(mockApiService.Getallcourse).toHaveBeenCalled();
    expect(component.coursedata).toEqual([]);
  });

  it('should set filter value on filterchange', () => {
    const inputElement = document.createElement('input');
    const event = new Event('input');
    spyOnProperty(event, 'target').and.returnValue(inputElement);
    spyOnProperty(inputElement, 'value').and.returnValue('test');

    component.filterchange(event);

    expect(component.finaldata.filter).toBe('test');
  });

  it('should set access data on initialization', () => {
    const accessData = [
      { haveadd: true, haveedit: true, havedelete: true }
    ];
    mockAuthService.Getaccessbyrole.and.returnValue(of(accessData));

    component.ngOnInit();

    expect(mockAuthService.Getaccessbyrole).toHaveBeenCalled();
    expect(component.accessdata).toEqual(accessData);
    expect(component.haveadd).toBe(true);
    expect(component.haveedit).toBe(true);
    expect(component.havedelete).toBe(true);
  });

  it('should not open a popup for editing if access is not available', () => {
    component.haveedit = false;
    const toastrService = fixture.componentInstance['toastr']; // Accessing private toastr property
    spyOn(toastrService, 'warning');
    component.Openpopup(1);
    expect(mockMatDialog.open).not.toHaveBeenCalled();
    expect(toastrService.warning).toHaveBeenCalledWith('Only admin is eligible for adding courses');
    expect(toastrService.warning).toHaveBeenCalledTimes(1);
  });

  it('should not remove a course if access is not available', () => {
    component.havedelete = false;
    const toastrService = fixture.componentInstance['toastr']; // Accessing private toastr property
    spyOn(toastrService, 'warning');
    component.RemoveCourse(1);
    expect(mockApiService.RemoveCoursebycode).not.toHaveBeenCalled();
    expect(toastrService.warning).toHaveBeenCalledWith('You dont have access for Delete.Please login with admin credentials');
  });

  
});
