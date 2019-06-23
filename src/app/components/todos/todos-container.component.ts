import { Component } from '@angular/core';

import { Todo } from '../../types/todo.interface';
import { NavItem } from '../../types/nav-item.type';

@Component({
  selector: 'app-todos-container',
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">5.0</div>

      <ng-container *ngIf="todos; else loading">
        <app-todo-form (add)="addTodo($event)"></app-todo-form>
        <app-todo-nav
          [navItems]="navItems"
          [navState]="navState"
          (changeNav)="navState=$event"></app-todo-nav>
        <app-todo-list
          [todos]="todos"
          [navState]="navState"
          (toggle)="toggleTodo($event)"
          (remove)="removeTodo($event)"></app-todo-list>
        <app-todo-footer
          [countCompleted]="countCompleted()"
          [countActive]="countActive()"
          (toggleAll)="toggleAll($event)"
          (removeCompleted)="removeCompleted()"></app-todo-footer>
      </ng-container>
      <ng-template #loading><i class="fas fa-spinner fa-spin fa-2x"></i></ng-template>
    </div>

    <pre>{{ todos | json }}</pre>
    <pre>{{ navState }}</pre>
  `,
  styles: [`
    .container {
      max-width: 750px;
      min-width: 450px;
      margin: 0 auto;
      padding: 15px;
    }

    .title {
      font-size: 4.5em;
      font-weight: 100;
      text-align: center;
      color: #23b7e5;
    }

    .ver {
      font-weight: 100;
      text-align: center;
      color: #23b7e5;
      margin-bottom: 30px;
    }

    /** Spinner */
    .fa-spinner {
      width: 100%;
      text-align: center;
    }
  `]
})
export class TodosContainerComponent {
  todos: Todo[];
  navItems: NavItem[] = ['All', 'Active', 'Completed'];
  navState: NavItem = 'All';

  constructor() {
    this.getTodos();
  }

  getTodos() {
    setTimeout(() => {
      this.todos = [
        { id: 1, content: 'HTML', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 3, content: 'Javascript', completed: false }
      ];
    }, 1000);
  }

  addTodo(content: string) {
    this.todos = [ { id: this.gererateId(), content, completed: false }, ...this.todos];
  }

  gererateId() {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleAll(completed: boolean) {
    this.todos = this.todos.map(todo => ({ ...todo, completed }));
  }

  removeCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  countCompleted() {
    return this.todos.filter(todo => todo.completed).length;
  }

  countActive() {
    return this.todos.filter(todo => !todo.completed).length;
  }
}
