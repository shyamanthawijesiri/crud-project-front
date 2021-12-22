import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import {NgForm} from '@angular/forms';
import { Employee } from '../shared/employee.model';

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
    console.log('form value');
    console.log(form.value._id);
    if(form.value._id==""){

      this.employeeService.postEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        console.log('successfully enter employee')
      });
    }else{

      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        console.log('successfully update employee')
      });
    }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.allEmp = res;
      console.log(res);
    })

  }
  onEdit(emp: Employee){
    console.log(emp._id);
    this._id= emp._id;
    this.name = emp.name;
    this.position = emp.position;
    this.office = emp.office;
    this.salary = emp.salary
  }
  // onSubmit(f: NgForm) {
  //   console.log(f.value);  // { first: '', last: '' }
  //   console.log(f.valid);  // false
  // }

}
