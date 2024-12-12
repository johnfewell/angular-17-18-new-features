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
      <h2>Signals in Angular 17/18</h2>

      <!-- Basic Signal Example -->
      <div class="demo-section">
        <h3>1. Basic Signal</h3>
        <div class="explanation">
          <p>
            A signal is a wrapper around a value that can notify interested
            consumers when that value changes.
          </p>
          <pre>
count = signal(0);  // Create a signal
count();            // Read the value
count.set(1);       // Set a new value
count.update(c => c + 1);  // Update based on previous</pre
          >
        </div>

        <div class="demo-box">
          <p>
            Count: <strong>{{ count() }}</strong>
          </p>
          <p>
            Doubled (computed): <strong>{{ doubledCount() }}</strong>
          </p>
          <button (click)="increment()">Increment</button>
        </div>
      </div>

      <!-- Computed Signals -->
      <div class="demo-section">
        <h3>2. Computed Signals</h3>
        <div class="explanation">
          <p>
            Computed signals automatically update when their dependencies
            change. They're perfect for derived state.
          </p>
          <pre>
doubledCount = computed(() => count() * 2);

completedCount = computed(() =>
  todos().filter(t => t.completed).length
);</pre
          >
        </div>

        <div class="demo-box">
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
          <div class="stats">
            <p>
              Completed:
              <strong>{{ completedCount() }} / {{ totalCount() }}</strong>
            </p>
            <p>
              Progress: <strong>{{ completionPercentage() }}%</strong>
            </p>
            <p class="note">
              👆 These stats automatically update when todos change
            </p>
          </div>
        </div>
      </div>

      <!-- Effects -->
      <div class="demo-section">
        <h3>3. Effects</h3>
        <div class="explanation">
          <p>
            Effects run side effects automatically when their signal
            dependencies change. Perfect for logging, persistence, or DOM
            updates.
          </p>

          <p class="note">
            👉 Open the console to see the effect logging changes
          </p>
        </div>

        <!-- Signal Updates -->
        <div class="demo-section">
          <h3>4. Declarative Updates</h3>
          <div class="explanation">
            <p>
              Signals encourage immutable updates through .set() and .update()
              methods. This makes state changes predictable.
            </p>
            <pre>
// ❌ Don't mutate objects in signals
todos()[0].completed = true;

// ✅ Use immutable updates
todos.update(list => list.map(todo => {{ '{' }}{{ '}' }}
  todo.id === id
    ? {{ '{' }}{{ '}' }} ...todo, completed: !todo.completed {{ '}' }}
    : todo
{{ '}' }}))</pre
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .signals-demo {
        padding: 20px;
      }
      .demo-section {
        margin: 30px 0;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: white;
      }
      .explanation {
        margin: 15px 0;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 4px;
      }
      .explanation pre {
        background: #f1f3f5;
        padding: 15px;
        border-radius: 4px;
        overflow-x: auto;
        font-family: monospace;
      }
      .demo-box {
        margin: 20px 0;
        padding: 20px;
        background: #e3f2fd;
        border-radius: 4px;
      }
      .todo-item {
        display: flex;
        gap: 10px;
        margin: 8px 0;
        align-items: center;
      }
      .completed {
        text-decoration: line-through;
        color: #666;
      }
      .stats {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #ccc;
      }
      .note {
        font-size: 0.9em;
        color: #666;
        font-style: italic;
      }
      button {
        padding: 8px 16px;
        background: #1976d2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background: #1565c0;
      }
      strong {
        color: #1976d2;
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
