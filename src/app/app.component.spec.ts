import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { getCopy } from './i18n';

describe('Local form flow', () => {
  let fixture: ComponentFixture<AppComponent>;
  let root: HTMLElement;
  const input = (id: string) => root.querySelector<HTMLInputElement>('#' + id)!;
  const button = (selector: string) => root.querySelector<HTMLButtonElement>(selector)!;
  async function settle() { fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges(); }
  async function enter(id: string, value: string) { input(id).value = value; input(id).dispatchEvent(new Event('input')); await settle(); }
  async function click(selector: string) { button(selector).click(); await settle(); }
  async function valid() { await enter('email', 'alex@example.test'); await enter('password', 'fictional-only'); }
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [AppModule]}).compileComponents();
    fixture = TestBed.createComponent(AppComponent); root = fixture.nativeElement; await settle();
  });
  it('starts in Spanish with an accurate title and no initial errors', () => {
    expect(document.documentElement.lang).toBe('es');
    expect(document.title).toBe('Formulario de acceso');
    expect(root.querySelector('h1')!.textContent).toContain('Formulario de acceso');
    expect(root.querySelector('[role="alert"]')).toBeNull();
    expect(input('password').type).toBe('password');
  });
  it('rejects an empty submit, links both errors and focuses email', async () => {
    await click('[type="submit"]');
    expect(root.querySelector('[role="alert"]')!.textContent).toContain('Revisa los campos indicados');
    expect(root.querySelectorAll('.error-summary a').length).toBe(2);
    expect(input('email').getAttribute('aria-invalid')).toBe('true');
    expect(input('password').getAttribute('aria-describedby')).toBe('password-error');
    expect(document.activeElement).toBe(input('email'));
  });
  it('explains a malformed email and preserves both drafts for correction', async () => {
    await enter('email', 'not-an-email'); await enter('password', 'fictional-only');
    await click('[type="submit"]');
    expect(root.querySelector('#email-error')!.textContent).toContain('alex@example.test');
    expect(input('email').value).toBe('not-an-email'); expect(input('password').value).toBe('fictional-only');
    expect(root.querySelector('[role="status"]')!.textContent).toBe('');
  });
  it('focuses password when only that field is missing', async () => {
    await enter('email', 'alex@example.test'); await click('[type="submit"]');
    expect(document.activeElement).toBe(input('password'));
    expect(input('email').hasAttribute('aria-invalid')).toBeFalse();
    expect(root.querySelectorAll('.error-summary a').length).toBe(1);
  });
  it('focuses email when only that field is missing', async () => {
    await enter('password', 'fictional-only'); await click('[type="submit"]');
    expect(document.activeElement).toBe(input('email'));
    expect(root.querySelectorAll('.error-summary a').length).toBe(1);
  });
  it('recovers from errors and clears the password after a valid check', async () => {
    await click('[type="submit"]'); await valid(); await click('[type="submit"]');
    expect(root.querySelector('[role="alert"]')).toBeNull();
    expect(input('email').value).toBe('alex@example.test'); expect(input('password').value).toBe('');
    expect(root.querySelector('[role="status"]')!.textContent).toBe('Formulario comprobado. Contraseña borrada.');
  });
  it('does not log or persist the submitted values', async () => {
    const log = spyOn(console, 'log'); const storage = spyOn(Storage.prototype, 'setItem');
    await valid(); await click('[type="submit"]');
    expect(log).not.toHaveBeenCalled(); expect(storage).not.toHaveBeenCalled();
    expect(root.textContent).not.toContain('fictional-only');
  });
  it('shows and hides a draft without submitting or clearing it', async () => {
    await valid(); await click('.visibility');
    expect(input('password').type).toBe('text'); expect(button('.visibility').getAttribute('aria-pressed')).toBe('true');
    expect(button('.visibility').getAttribute('aria-label')).toBe('Ocultar contraseña');
    expect(root.querySelector('[role="status"]')!.textContent).toBe('');
    await click('.visibility'); expect(input('password').type).toBe('password');
    expect(input('password').value).toBe('fictional-only');
  });
  it('masks a visible password after a valid check', async () => {
    await valid(); await click('.visibility'); await click('[type="submit"]');
    expect(input('password').type).toBe('password'); expect(input('password').value).toBe('');
  });
  it('clears fields, errors and visibility and returns focus to email', async () => {
    await enter('email', 'bad'); await enter('password', 'fictional-only');
    await click('.visibility'); await click('[type="submit"]'); await click('.actions [type="button"]');
    expect(input('email').value).toBe(''); expect(input('password').value).toBe('');
    expect(input('password').type).toBe('password'); expect(root.querySelector('[role="alert"]')).toBeNull();
    expect(document.activeElement).toBe(input('email'));
    expect(root.querySelector('[role="status"]')!.textContent).toBe('Campos vaciados.');
  });
  it('preserves drafts and visibility when switching to English', async () => {
    await valid(); await click('.visibility'); await click('[lang="en"]');
    expect(document.documentElement.lang).toBe('en'); expect(document.title).toBe('Login form');
    expect(input('email').value).toBe('alex@example.test'); expect(input('password').value).toBe('fictional-only');
    expect(input('password').type).toBe('text'); expect(button('.visibility').getAttribute('aria-label')).toBe('Hide password');
  });
  it('translates existing errors without discarding the entered email', async () => {
    await enter('email', 'bad'); await click('[type="submit"]'); await click('[lang="en"]');
    expect(root.querySelector('[role="alert"]')!.textContent).toContain('Check the highlighted fields');
    expect(root.querySelector('#password-error')!.textContent).toContain('example password');
    expect(input('email').value).toBe('bad');
  });
  it('translates success status and can return to Spanish', async () => {
    await valid(); await click('[type="submit"]'); await click('[lang="en"]');
    expect(root.querySelector('[role="status"]')!.textContent).toBe('Form checked. Password cleared.');
    await click('[lang="es"]'); expect(root.querySelector('[role="status"]')!.textContent).toContain('Contraseña borrada');
  });
  it('dismisses an obsolete success status when a new draft is entered', async () => {
    await valid(); await click('[type="submit"]'); await enter('password', 'second-example');
    expect(root.querySelector('[role="status"]')!.textContent).toBe('');
  });
  it('requires password again on a repeated check after clearing it', async () => {
    await valid(); await click('[type="submit"]'); await click('[type="submit"]');
    expect(root.querySelector('#password-error')).not.toBeNull();
    expect(document.activeElement).toBe(input('password'));
    expect(root.querySelector('[role="status"]')!.textContent).toBe('');
  });
  it('does not impose a fictional password strength policy', async () => {
    await enter('email', 'alex@example.test'); await enter('password', 'x'); await click('[type="submit"]');
    expect(root.querySelector('[role="status"]')!.textContent).toContain('Formulario comprobado');
  });
  it('clears an English draft while keeping the selected language', async () => {
    await click('[lang="en"]'); await valid(); await click('.actions [type="button"]');
    expect(document.documentElement.lang).toBe('en');
    expect(root.querySelector('[role="status"]')!.textContent).toBe('Fields cleared.');
  });
  it('uses English for unsupported language resource requests', () => {
    expect(getCopy('fr').submit).toBe('Check form');
    expect(getCopy('__proto__').submit).toBe('Check form');
  });
});
