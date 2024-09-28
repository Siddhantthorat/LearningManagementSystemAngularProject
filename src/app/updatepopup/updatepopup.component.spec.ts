
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/material.module';
import { AuthService } from '../service/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { UpdatepopupComponent } from './updatepopup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdatepopupComponent', () => {
  let component: UpdatepopupComponent;
  let fixture: ComponentFixture<UpdatepopupComponent>;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatepopupComponent],
      imports:[HttpClientTestingModule,ToastrModule.forRoot(),MatCheckboxModule,MatCheckboxModule
        ,MatDialogModule,MatFormFieldModule,MatSelectModule,
        ReactiveFormsModule,MatInputModule, BrowserAnimationsModule],
      providers:[ { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef,useValue: {}}]
    });
    fixture = TestBed.createComponent(UpdatepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
