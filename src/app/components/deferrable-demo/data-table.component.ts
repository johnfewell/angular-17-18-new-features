import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TableData {
  id: number;
  name: string;
  value: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          @for (item of data(); track item.id) {
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .data-table {
        margin: 20px 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      th {
        background: #f8f9fa;
        font-weight: 600;
        color: #333;
      }
      tr:last-child td {
        border-bottom: none;
      }
      tr:hover {
        background: #f8f9fa;
      }
    `,
  ],
})
export class DataTableComponent {
  @Input({ required: true }) data!: () => TableData[];
}
