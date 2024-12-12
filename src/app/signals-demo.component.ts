import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="signals-demo">
      <h2>Signals Demo</h2>

      <!-- Reactive Counter -->
      <div class="demo-section">
        <h3>Basic Signal</h3>
        <p>Count: {{ count() }}</p>
        <p>Doubled: {{ doubledCount() }}</p>
        <button (click)="increment()">Increment</button>
      </div>

      <!-- Todos with Computed Signals -->
      <div class="demo-section">
        <h3>Computed Signals with Todos</h3>
        <div class="todos">
          @for (todo of todos(); track todo.id) {
          <div class="todo-item">
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id)"
            />
            <span [class.completed]="todo.completed">{{ todo.text }}</span>
          </div>
          }
        </div>
        <p>Completed: {{ completedCount() }} / {{ totalCount() }}</p>
        <p>Progress: {{ completionPercentage() }}%</p>
      </div>
    </div>
  `,
  styles: [
    `
      .signals-demo {
        padding: 20px;
      }
      .demo-section {
        margin: 20px 0;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .todo-item {
        display: flex;
        gap: 10px;
        margin: 5px 0;
      }
      .completed {
        text-decoration: line-through;
        color: #666;
      }
    `,
  ],
})
export class SignalsDemoComponent {
  // Basic Signal
  count = signal(0);

  // Computed Signal
  doubledCount = computed(() => this.count() * 2);

  // Todos Signal
  todos = signal<Todo[]>([
    { id: 1, text: 'Learn Signals', completed: true },
    { id: 2, text: 'Master Computed Signals', completed: false },
    { id: 3, text: 'Understand Effects', completed: false },
  ]);

  // Computed Signals for Todos
  completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length
  );

  totalCount = computed(() => this.todos().length);

  completionPercentage = computed(() =>
    Math.round((this.completedCount() / this.totalCount()) * 100)
  );

  // Effect for logging (demonstration purposes)
  logger = effect(() => {
    console.log(
      `Todos updated. Completed: ${this.completedCount()} of ${this.totalCount()}`
    );
  });

  // Methods
  increment() {
    this.count.update((count) => count + 1);
  }

  toggleTodo(id: number) {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
}
