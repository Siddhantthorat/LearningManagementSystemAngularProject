import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { coursemodel } from '../Model/coursemodel';
import { PopupComponent } from '../popup/popup.component';

import * as alertify from 'alertifyjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: ApiService,private toastr: ToastrService,private service:AuthService,private router:Router) { 

    this.SetAccesspermission();
  }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  coursedata!:coursemodel[];
  finaldata:any;

  accessdata:any;
  haveedit=false;
  haveadd=false;
  havedelete=false;



  ngOnInit(): void {
    this.LoadCourse();
  }

  displayColums: string[] = ['id', 'coursename', 'courseduration', 'coursedescription', 'technology', 'launchurl','action']

  SetAccesspermission() {
    this.service.Getaccessbyrole(this.service.GetUserrole()).subscribe(res => {
      this.accessdata = res;
      console.log(this.accessdata);

      if(this.accessdata.length>0){
        this.haveadd=this.accessdata[0].haveadd;
        this.haveedit=this.accessdata[0].haveedit;
        this.havedelete=this.accessdata[0].havedelete;
        this.LoadCourse();
      }else{
        alert('you are not authorized to access.Please login with admin credentials');
        this.router.navigate(['login']);
      }

    });
  }


  Openpopup(id: any) {

    if(this.haveedit){
      const _popup = this.dialog.open(PopupComponent, {
        width: '500px',
        exitAnimationDuration: '1000ms',
        enterAnimationDuration: '1000ms',
        data: {
          id: id
        }
      })
      _popup.afterClosed().subscribe(r => {
        this.LoadCourse();
      });
       
    }
    else{
      this.toastr.warning("Only admin is eligible for adding courses");
    }

    
  }

  LoadCourse() {
    this.api.Getallcourse().subscribe(response => {
      this.coursedata = response;
      this.finaldata=new MatTableDataSource<coursemodel>(this.coursedata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }


  EditCourse(id: any) {

    if(this.haveedit){
      this.Openpopup(id);
        this.toastr.success("Success");
    }
    else{
      this.toastr.warning("You dont have access for Update.Please login with admin credentials");
    }
    
  }
   RemoveCourse(id: any) {
    if(this.havedelete){
      alertify.confirm("Remove Course", "do you want remove this course?", () => {
        this.api.RemoveCoursebycode(id).subscribe(r => {
          this.LoadCourse();
        });
      }, function () {
  
      })
        
    }
    else{
      this.toastr.warning("You dont have access for Delete.Please login with admin credentials");
    }
    


  }
  filterchange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.finaldata.filter=value;
  }
}
