import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService) { }

   

  ngOnInit(): void {
    if(this.data.id!=' '&& this.data.id!=null)
    {
      this.api.GetCoursebycode(this.data.id).subscribe(res=>{
        this.editdata=res;
        this.courseform.setValue({id:this.editdata.id ,coursename:this.editdata.coursename , courseduration:this.editdata.courseduration,
        coursedescription:this.editdata.coursedescription ,technology:this.editdata.technology, launchurl:this.editdata.launchurl});
      });
    }
 
  }

  courseform = this.builder.group({
    id: this.builder.control({value:'', disabled: true }),
    coursename: this.builder.control('', [Validators.required,Validators.maxLength(20)]),
    courseduration: this.builder.control('',[ Validators.required,Validators.pattern("^[0-9]*$")]),
    coursedescription: this.builder.control('', [Validators.required,Validators.maxLength(100)]),
    technology: this.builder.control('', Validators.required),
    launchurl: this.builder.control('', Validators.required),
  });
  
  

  
  SaveCourse(){
      if(this.courseform.valid){
        const Editid =this.courseform.getRawValue().id;  
        if(Editid!='' && Editid!=null)
        {//update scenario
          this.api.UpdateCourse(Editid,this.courseform.getRawValue()).subscribe(response=>{
            console.log(this.courseform.value);
            this.closepopup();
            this.toastr.success(" Details Updated Successfully");
          });
        } 
        else{
          //create scenario
          this.api.CreateCourse(this.courseform.value).subscribe(response=>{
            console.log(this.courseform.value);
            this.closepopup();
            this.toastr.success("Saved Details Successfully");
          });
        }    
        
      }
      else{
        console.log(this.courseform.value);
        this.toastr.warning("Enter Valid Details");
      }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
