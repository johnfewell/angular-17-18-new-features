import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartData {
  month: string;
  value: number;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart">
      <div class="chart-container">
        @for (item of data(); track item.month) {
        <div
          class="chart-bar"
          [style.height.%]="getBarHeight(item.value)"
          [title]="item.month + ': ' + item.value"
        >
          <div class="bar-value">{{ item.value }}</div>
          <div class="bar-label">{{ item.month }}</div>
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .chart {
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .chart-container {
        height: 200px;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        padding: 20px 10px;
        gap: 10px;
      }
      .chart-bar {
        flex: 1;
        background: #1976d2;
        min-width: 40px;
        border-radius: 4px 4px 0 0;
        position: relative;
        transition: height 0.3s ease;
      }
      .bar-value {
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #666;
      }
      .bar-label {
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #666;
      }
    `,
  ],
})
export class ChartComponent {
  @Input({ required: true }) data!: () => ChartData[];

  getBarHeight(value: number): number {
    const maxValue = Math.max(...this.data().map((item) => item.value));
    return (value / maxValue) * 100;
  }
}
