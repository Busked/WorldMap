import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CountryinfoComponent } from '../countryinfo/countryinfo.component';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-worldmap',
  standalone: true,
  imports: [CommonModule, CountryinfoComponent, HttpClientModule],
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {

  countryName: string | null = null;
  countryCapital: string | null = null;
  countryRegion: string | null = null;
  countryIncomeLevel: string | null = null;
  countryAdditionalFactOne: string | null = null; // Population
  countryAdditionalFactTwo: string | null = null; // GDP
  countryId: string | null = null;
  countryCode: string | null = null;

  constructor(private countryService: CountryService, private http: HttpClient, private el: ElementRef) {}

  ngOnInit(): void {
    // Load the SVG content and inject it into the component
    this.http.get('../../assets/map-image.svg', { responseType: 'text' }).subscribe(svgContent => {
      const container = this.el.nativeElement.querySelector('.worldmap-container');
      container.innerHTML = svgContent;
      this.addEventListeners(container);
    });
  }

  private addEventListeners(container: HTMLElement): void {
    // Adding mouse click event handlers
    const paths = container.querySelectorAll('path');
    paths.forEach((path) => {
      path.addEventListener('click', (event) => this.onPathClick(event));
    });
  }

  onPathClick(event: Event): void {
    const paths = this.el.nativeElement.querySelectorAll('path');
    paths.forEach((path: any) => {
      path.style.fill = ''; // Reset all colors
    });

    // Event handler for clicked country
    const target = event.target as SVGPathElement;
    const clickedCountryId = target.getAttribute('id');

    this.countryName = target.getAttribute('name');
    this.countryId = target.getAttribute('id');
    if (this.countryId === clickedCountryId) {
      target.style.fill = '#ff4500'; // Highlight selected country
    }
    if (this.countryId) {
      this.fetchInfoAboutCountry(this.countryId);
    }
  }

  fetchInfoAboutCountry(countryCode: string): void {
    // Get country general info (e.g., capital, region, income level)
    this.countryService.getCountryInfo(countryCode).subscribe({
      next: (data) => {
        const allData = data[1][0];
        this.countryCode = allData.id;
        this.countryCapital = allData.capitalCity;
        this.countryRegion = allData.region.value;
        this.countryIncomeLevel = allData.incomeLevel.value;
      },
      error: (error) => {
        console.error('Error fetching country info:', error);
      },
      complete: () => {
        console.log('Country info fetched successfully.');
      }
    });

    // Get population data (Fact 1)
    this.countryService.getPopulation(countryCode).subscribe({
      next: (data) => {
        if (data && data[1] && data[1].length > 0) {
          const populationData = data[1][0];
          this.countryAdditionalFactOne = populationData.value
            ? `${parseInt(populationData.value).toLocaleString()} people`
            : 'Not Available';
        } else {
          this.countryAdditionalFactOne = 'Not Available';
        }
      },
      error: (error) => {
        console.error('Error fetching population data:', error);
      }
    });

    // Get GDP data (Fact 2)
    this.countryService.getGDPPerCapita(countryCode).subscribe({
      next: (data) => {
        if (data && data[1] && data[1].length > 0) {
          const gdpData = data[1][0];
          this.countryAdditionalFactTwo = gdpData.value
            ? `$${parseFloat(gdpData.value).toFixed(2)}`
            : 'Not Available';
        } else {
          this.countryAdditionalFactTwo = 'Not Available';
        }
      },
      error: (error) => {
        console.error('Error fetching GDP data:', error);
      }
    });
  }
}
