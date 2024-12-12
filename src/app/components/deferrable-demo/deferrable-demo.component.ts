import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { DataTableComponent } from './data-table.component';
import { MapComponent } from './map.component';
import { WeatherWidgetComponent } from './weather-widget.component';

@Component({
  selector: 'app-deferrable-demo',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
    DataTableComponent,
    MapComponent,
    WeatherWidgetComponent,
  ],
  template: `
    <div class="deferrable-demo">
      <h2>Deferrable Views in Angular 17</h2>

      <!-- On Viewport Strategy -->
      <div class="demo-section">
        <h3>1. Loading on Viewport</h3>
        <div class="code-example">
          <pre>
// 📜 Load when component scrolls into view

</pre
          >
        </div>

        <div class="viewport-demo">
          <p>👇 Scroll down to load the chart</p>
          <div class="scroll-container">
            @defer (on viewport) {
            <app-chart [data]="chartData" />
            } @loading {
            <div class="loading-placeholder">
              <div class="loading-spinner"></div>
              <p>Loading chart...</p>
            </div>
            } @placeholder {
            <div class="placeholder">
              Chart will appear here when scrolled into view
            </div>
            } @error {
            <div class="error-state">Failed to load chart</div>
            }
          </div>
        </div>
      </div>

      <!-- On Interaction Strategy -->
      <div class="demo-section">
        <h3>2. Loading on Interaction</h3>
        <div class="code-example">
          <pre>
// 🖱️ Load when user clicks a trigger element

</pre
          >
        </div>

        <button #dataTableTrigger>Show Data Table</button>
        @defer (on interaction(dataTableTrigger)) {
        <app-data-table [data]="tableData" />
        } @loading {
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>Loading data table...</p>
        </div>
        } @error {
        <div class="error-state">Failed to load data table</div>
        }
      </div>

      <!-- On Hover Strategy -->
      <div class="demo-section">
        <h3>3. Loading on Hover</h3>
        <div class="code-example">
          <pre>
// 🖱️ Load when user hovers over an area

</pre
          >
        </div>

        <div #mapContainer class="map-container">
          <p>🖱️ Hover over this area to load the map</p>
          @defer (on hover(mapContainer)) {
          <app-map />
          } @loading {
          <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <p>Loading map...</p>
          </div>
          } @error {
          <div class="error-state">Failed to load map</div>
          }
        </div>
      </div>

      <!-- Timer Trigger -->
      <div class="demo-section">
        <h3>4. Timer</h3>
        <div class="code-example">
          <pre>
// 🔄 Load after 10 second

</pre
          >
        </div>

        @defer (on timer(10000ms)) {

        <app-weather-widget />
        } @loading {
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>Loading weather widget...</p>
        </div>
        } @error {
        <div class="error-state">Failed to load weather widget</div>
        }
      </div>

      <!-- Prefetching Strategy -->
      <div class="demo-section">
        <h3>5. Prefetching Strategy</h3>
        <div class="code-example">
          <pre>
          // 🚀 Start loading before content is needed

</pre
          >
        </div>

        <p>
          The content below will start loading when you are idle, before it's
          visible
        </p>
        @defer (prefetch on idle) {
        <div class="prefetch-demo">
          <app-chart [data]="prefetchChartData" />
        </div>
        } @loading {
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>Loading content...</p>
        </div>
        } @error {
        <div class="error-state">Failed to load prefetched content</div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .deferrable-demo {
        padding: 20px;
      }
      .demo-section {
        margin: 30px 0;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: white;
      }
      .code-example {
        background: #f5f5f5;
        padding: 15px;
        border-radius: 4px;
        margin: 15px 0;
        font-family: monospace;
      }
      .code-example pre {
        margin: 0;
        white-space: pre-wrap;
      }
      .scroll-container {
        height: 300px;
        overflow-y: auto;
        border: 1px solid #eee;
        padding: 20px;
        margin: 20px 0;
      }
      .loading-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        background: #f8f9fa;
        border-radius: 4px;
      }
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      .placeholder {
        padding: 40px;
        text-align: center;
        background: #f8f9fa;
        border: 2px dashed #ddd;
        border-radius: 4px;
        color: #666;
      }
      .error-state {
        padding: 20px;
        text-align: center;
        background: #fee;
        border: 1px solid #fcc;
        border-radius: 4px;
        color: #c00;
      }
      .map-container {
        min-height: 200px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
      }
      .prefetch-demo {
        padding: 20px;
        background: #e3f2fd;
        border-radius: 4px;
      }
      button {
        padding: 10px 20px;
        background: #1976d2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 10px 0;
      }
      button:hover {
        background: #1565c0;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class DeferrableDemoComponent {
  // Chart data for viewport loading example
  chartData = signal([
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 150 },
    { month: 'Mar', value: 120 },
    { month: 'Apr', value: 180 },
  ]);

  // Different data for prefetch example
  prefetchChartData = signal([
    { month: 'Q1', value: 350 },
    { month: 'Q2', value: 420 },
    { month: 'Q3', value: 380 },
    { month: 'Q4', value: 450 },
  ]);

  // Table data for interaction example
  tableData = signal([
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
    { id: 3, name: 'Item 3', value: 300 },
  ]);
}
