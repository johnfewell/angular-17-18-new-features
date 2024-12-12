import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
}

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weather-widget">
      <div class="weather-main">
        <div class="weather-icon">{{ weather.icon }}</div>
        <div class="weather-info">
          <div class="temperature">{{ weather.temperature }}°C</div>
          <div class="condition">{{ weather.condition }}</div>
        </div>
      </div>
      <div class="weather-details">
        <div class="detail">
          <span class="label">Humidity</span>
          <span class="value">{{ weather.humidity }}%</span>
        </div>
        <div class="detail">
          <span class="label">Wind</span>
          <span class="value">{{ weather.wind }} km/h</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .weather-widget {
        background: linear-gradient(135deg, #1976d2, #64b5f6);
        color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .weather-main {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
      }
      .weather-icon {
        font-size: 48px;
      }
      .weather-info {
        flex: 1;
      }
      .temperature {
        font-size: 36px;
        font-weight: 600;
        line-height: 1;
      }
      .condition {
        font-size: 16px;
        opacity: 0.9;
        margin-top: 4px;
      }
      .weather-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }
      .detail {
        display: flex;
        flex-direction: column;
      }
      .label {
        font-size: 12px;
        opacity: 0.8;
      }
      .value {
        font-size: 16px;
        font-weight: 500;
        margin-top: 4px;
      }
    `,
  ],
})
export class WeatherWidgetComponent implements OnInit {
  weather: WeatherData = {
    temperature: 22,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 65,
    wind: 12,
  };

  ngOnInit() {
    console.log('Weather widget loaded');
  }
}
