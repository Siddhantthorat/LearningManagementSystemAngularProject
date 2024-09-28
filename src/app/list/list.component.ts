import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  accessdata:any;
  haveedit=false;
  haveadd=false;
  havedelete=false;
  constructor(private builder: FormBuilder, private service: AuthService, private dialog: MatDialog) {
    this.SetAccesspermission();
  }
  userlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  LoadUser(){
    this.service.GetAll().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  });
  }
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];
  
  SetAccesspermission() {
    this.service.Getaccessbyrole(this.service.GetUserrole()).subscribe(res => {
      this.accessdata = res;
      console.log(this.accessdata);

      if(this.accessdata.length>0){
        this.haveadd=this.accessdata[0].haveadd;
        this.haveedit=this.accessdata[0].haveedit;
        this.havedelete=this.accessdata[0].havedelete;
        this.LoadUser();
      }else{
        alert('you are not authorized to access.Please login with admin credentials');
        // this.router.navigate(['login']);
      }

    });
  }



  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }
}