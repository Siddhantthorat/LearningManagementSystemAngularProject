import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthService } from '../service/auth.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  const mockUsers = [
    { username: 'user1', name: 'User One', email: 'user.one@example.com', status: 'Active', role: 'User' },
    { username: 'user2', name: 'User Two', email: 'user.two@example.com', status: 'Inactive', role: 'Admin' },
  ];

  beforeEach(() => {

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['GetAll']);

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(),
        MatDialogModule, MatCardModule, MatTableModule,
        MatFormFieldModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule, MatPaginatorModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} },]
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load users on initialization', () => {
  //   mockAuthService.GetAll.and.returnValue(of(mockUsers));
    
  //   component.LoadUser();

  //   expect(component.userlist).toEqual(mockUsers);
  //   expect(component.dataSource).toEqual(jasmine.any(MatTableDataSource));
  //   expect(component.dataSource.data).toEqual(mockUsers);
  //   expect(component.dataSource.paginator).toEqual(jasmine.any(MatPaginator));
  //   expect(component.dataSource.sort).toEqual(jasmine.any(MatSort));
  // });

});
