import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl:'app/templates/home.html',
})
export class AppComponent {

constructor() { 
  this.populateArrayWithDelay();
}
students: Array<any> = [];
  public test(){
    alert("test");
  }

populateArrayWithDelay():void{
    let people = [
        {
            name: "Alan"
        },
        {
            name: "Jake"
        },
        {
            name: "Harry"
        },
        {
            name: "Susan"
        },
        {
            name: "Sarah"
        },
        {
            name: "Esther"
        }
    ];
    for(let i = 0; i < people.length; i++){
        let student = people[i];
        setTimeout(() => {
            this.students.push(student);
        }, 2000*(i+1));
    }
    
}
  
 }
