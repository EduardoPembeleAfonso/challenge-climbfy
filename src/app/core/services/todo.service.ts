import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor() {}

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  addTodo(todo: Todo): void {
    const currentTodos = this.todosSubject.value;
    this.todosSubject.next([...currentTodos, todo]);
  }

  toggleTodo(id: number): void {
    const currentTodos = this.todosSubject.value.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    this.todosSubject.next(currentTodos);
  } 

  deleteTodo(id: number): void {
    const currentTodos = this.todosSubject.value.filter((todo) => todo.id !== id);
    this.todosSubject.next(currentTodos);
  }
}
