import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student:Student=new Student();
  students:Student[]=[];
  formStudents=new FormGroup({});

  constructor(private _httpClient:HttpClient,private _formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this._httpClient.get(`https://api.mohamed-sadek.com/student/get`)
    .subscribe(
      (response:any)=>{
        console.log(JSON.stringify(response));
        this.students=response.Data;
        //alert("alert 1");
      }
      ,
      (error:any)=>{
        alert("error");
      }
    );
    this.formStudents=this._formBuilder.group({
      FristName:['' , [Validators.required,Validators.maxLength(15),Validators.minLength(3)]],
      LastName:['' , [Validators.required,Validators.maxLength(15),Validators.minLength(3)]],
      Age:['' , [Validators.required,Validators.max(90),Validators.min(10)]],
      Mobile: ['011', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],      Email:['' , [Validators.required,Validators.maxLength(30),Validators.minLength(10)]],
      NationalID:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]]
    });
  }

  setFirstName(newFirstname:string):void{
    this.student.FirstName=newFirstname
  }
  setLastName(newLastname:string):void{
    this.student.LastName=newLastname
  }
  setAge(newAge:string):void{
    this.student.Age=parseInt(newAge)
  }
  setMobail(newMobile:string):void{
    this.student.Mobile=newMobile
  }
  setEmail(newEmail:string):void{
    this.student.Email=newEmail
  }
  setNationalID(newNationalid:string):void{
    this.student.NationalID=newNationalid
  }


    // addNewStudent(): void {

    //   let student = new Student();
    //   student = this.formStudents.value;
    //   console.log(this.formStudents.value);
      
  
    //   this._httpClient.post(`https://api.mohamed-sadek.com/Student/Post`, student)
    //     .subscribe(
    //       (response: any) => {
    //           this.students.push(student);
    //       },
    //       (error: any) => {}
    //     );
    // };





  addStudent(firstName:string,lastName:string,age:number,mobile:string,email:string,nationalId:string):void{
    //this.students.push({fname:this.getFirstName(),lname:this.getLastName(),Sage:this.getAge()})
    let student=new Student();
    student.FirstName=firstName;
    student.LastName=lastName;
    student.Age=age;
    student.Mobile=mobile;
    student.Email=email;
    student.NationalID=nationalId;
    this._httpClient.post(`https://api.mohamed-sadek.com/student/post`,student)
    .subscribe(
      (response:any)=>{
        this.students.push(student);
        
      },
      (error:any)=>{}
    );
    this._httpClient.get(`https://api.mohamed-sadek.com/student/get`)
    .subscribe(
      (response:any)=>{
        console.log(JSON.stringify(response));
        this.students=response.Data;
        //alert("alert 1");
      }
      ,
      (error:any)=>{
        alert("error");
      }
    );
    //this.conunter=this.employees.length;
    console.log(this.students)
    console.log(this.students.length)
      
  }

  isValidControl(name:string):boolean{
    return this.formStudents.controls[name].valid
  }

  isInValidAndTouched(name:string):boolean
  {
    return  this.formStudents.controls[name].invalid && (this.formStudents.controls[name].dirty || this.formStudents.controls[name].touched);
  }

  isControlHasError(name:string,error:string):boolean
  {
    console.log(this.formStudents.controls[name].errors?.[error])
    return  this.formStudents.controls[name].invalid && this.formStudents.controls[name].errors?.[error];
  }


  deletStudent(index:number):void
 {
 let student=this.students[index];
 this._httpClient.delete(`https://api.mohamed-sadek.com/student/Delete?id=${student.ID}`)
 .subscribe(
 (response:any)=>{
 this.students.splice(index,1);
 },
 (error:any)=>{}
 );
 }

}
