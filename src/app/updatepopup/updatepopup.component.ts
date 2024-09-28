import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent {


  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {

    this.service.getuserrolee().subscribe(res => {
      this.rolelist = res;
    });
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.service.Getbycode(this.data.usercode).subscribe(res=>{
        this.editdata = res;
             console.log(this.editdata);
             this.registerform.setValue({
              id: this.editdata.id, userName: this.editdata.userName,
               password: this.editdata.password, email: this.editdata.email,
              role: this.editdata.role, isactive: this.editdata.isactive
      });
      });
    }
  }
  rolelist: any;
  editdata: any;

  registerform = this.builder.group({
    id: this.builder.control(''),
    userName: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),

    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  // loaduserdata(code: any) {
  //   this.service.Getbycode(code).subscribe(res => {
  //     this.editdata = res;
  //     console.log(this.editdata);
  //     this.registerform.setValue({
  //       id: this.editdata.id, name: this.editdata.userName,
  //       password: this.editdata.password, email: this.editdata.email, gender: this.editdata.gender,
  //       role: this.editdata.role, isactive: this.editdata.isactive
  //     });
  //   });
  // }
  UpdateUser() {
    // this.service.updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
    //   this.toastr.success('Updated successfully.');
    //   this.dialogref.close();
    // });

    if(this.registerform.valid){
        this.service.Updateuser(this.registerform.value.id,this.registerform.value).subscribe(res=>{
          this.toastr.success('Updated successfully.');
        });
    }
    else{
      this.toastr.warning('Please Select Role');
    }
  }

}



