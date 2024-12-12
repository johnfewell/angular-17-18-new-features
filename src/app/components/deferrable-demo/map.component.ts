import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map">
      <div class="map-content">
        <div class="map-marker" style="top: 40%; left: 60%">📍</div>
        <div class="map-marker" style="top: 30%; left: 40%">📍</div>
        <div class="map-marker" style="top: 60%; left: 30%">📍</div>

        <!-- Grid Lines -->
        <div class="grid-lines">
          @for (line of gridLines; track line) {
          <div class="grid-line-horizontal" [style.top.%]="line"></div>
          <div class="grid-line-vertical" [style.left.%]="line"></div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .map {
        width: 100%;
        height: 300px;
        background: #e3f2fd;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
      }
      .map-content {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .map-marker {
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 24px;
        cursor: pointer;
        transition: transform 0.2s ease;
      }
      .map-marker:hover {
        transform: translate(-50%, -50%) scale(1.2);
      }
      .grid-lines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .grid-line-horizontal {
        position: absolute;
        width: 100%;
        height: 1px;
        background: rgba(25, 118, 210, 0.1);
      }
      .grid-line-vertical {
        position: absolute;
        width: 1px;
        height: 100%;
        background: rgba(25, 118, 210, 0.1);
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  gridLines = [0, 20, 40, 60, 80, 100];

  ngOnInit() {
    console.log('Heavy map component loaded');
  }
}
