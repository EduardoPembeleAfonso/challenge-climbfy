import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './core/models/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoService } from './core/services/todo.service';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  todoList: Todo[] = [];
  newTask: string = "";

  constructor(private todoService: TodoService) { }

  get completedTasksCount(): number {
    return this.todoList.filter(task => task.completed).length;
  }

  addTodo(): void {
    if (this.newTask.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        task: this.newTask,
        completed: false,
      };

      this.todoService.addTodo(newTodo);
      this.todoService.getTodos().subscribe((todos) => (this.todoList = todos));
      this.newTask = '';
    }
  }

  toggleComplete(id: number) : void {
    this.todoService.toggleTodo(id);
    this.todoService.getTodos().subscribe((todos) => (this.todoList = todos));
  }

  deleteTodo(id: number) : void {
    this.todoService.deleteTodo(id);
    this.todoService.getTodos().subscribe((todos) => (this.todoList = todos));
  }
}
