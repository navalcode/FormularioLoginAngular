import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyToolbarComponent } from './my-toolbar.component';
describe('Language controls', () => {
  let fixture: ComponentFixture<MyToolbarComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [MyToolbarComponent]}).compileComponents();
    fixture = TestBed.createComponent(MyToolbarComponent); fixture.detectChanges();
  });
  it('marks the fallback language as selected', () => {
    expect(fixture.nativeElement.querySelector('[lang="en"]').getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(2);
  });
  it('emits a Spanish choice without navigation or a form submit', () => {
    const listener = jasmine.createSpy('language'); fixture.componentInstance.languageChange.subscribe(listener);
    const button = fixture.nativeElement.querySelector('[lang="es"]'); button.click();
    expect(listener).toHaveBeenCalledOnceWith('es'); expect(button.type).toBe('button');
  });
});
