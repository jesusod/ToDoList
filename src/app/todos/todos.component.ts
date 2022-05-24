import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[]

  constructor( private dataService: DataService) { }

  ngOnInit(): void {

    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm){
 
    if (form.invalid) return alert("Form is invalid")

    this.dataService.addTodo(new Todo(form.value.text))

    form.reset()

  }

}
