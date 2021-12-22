import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {
  _id: string;
  name: string;
  position: string;
  office: string;
  salary: number;
  allEmp:any;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    // this.employeeService.selectedEmployee ={
    //   _id:"",
    //   name: "",
    //   position: "",
    //   office: "",
    //   salary:0

    // }
  }

  onSubmit(form:NgForm){
    this.employeeService.postEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
      console.log('successfully enter employee')
    });
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.allEmp = res;
      console.log(res);
    })

  }
  // onSubmit(f: NgForm) {
  //   console.log(f.value);  // { first: '', last: '' }
  //   console.log(f.valid);  // false
  // }

}
