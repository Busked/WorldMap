import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorldmapComponent } from './worldmap.component';

describe('WorldmapComponent', () => {
  let component: WorldmapComponent;
  let fixture: ComponentFixture<WorldmapComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorldmapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldmapComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the map container', () => {
    expect(element.querySelector('.worldmap-container')).toBeTruthy();
  });

  it('should have a defined component instance', () => {
    expect(component).toBeDefined();
  });
});

