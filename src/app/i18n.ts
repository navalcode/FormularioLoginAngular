export type Language = 'en' | 'es';
export const COPY = {
  en: {
    brand: 'Form practice', title: 'Login form',
    intro: 'Try validation with example data. Nothing is sent or saved.',
    skip: 'Skip to form', language: 'Language', email: 'Email', password: 'Password',
    emailHint: 'Example: alex@example.test', passwordHint: 'Use an example password.',
    show: 'Show', hide: 'Hide', showPassword: 'Show password', hidePassword: 'Hide password',
    submit: 'Check form', clear: 'Clear', errors: 'Check the highlighted fields.',
    emailRequired: 'Enter an example email address.', emailInvalid: 'Enter an email such as alex@example.test.',
    passwordRequired: 'Enter an example password.',
    checked: 'Form checked. Password cleared.', cleared: 'Fields cleared.'
  },
  es: {
    brand: 'Práctica de formularios', title: 'Formulario de acceso',
    intro: 'Prueba la validación con datos de ejemplo. No se envían ni se guardan.',
    skip: 'Saltar al formulario', language: 'Idioma', email: 'Email', password: 'Contraseña',
    emailHint: 'Ejemplo: alex@example.test', passwordHint: 'Usa una contraseña de ejemplo.',
    show: 'Mostrar', hide: 'Ocultar', showPassword: 'Mostrar contraseña', hidePassword: 'Ocultar contraseña',
    submit: 'Comprobar formulario', clear: 'Limpiar', errors: 'Revisa los campos indicados.',
    emailRequired: 'Introduce un email de ejemplo.', emailInvalid: 'Introduce un email como alex@example.test.',
    passwordRequired: 'Introduce una contraseña de ejemplo.',
    checked: 'Formulario comprobado. Contraseña borrada.', cleared: 'Campos vaciados.'
  }
};
export type Copy = typeof COPY.en;
export function getCopy(language: string): Copy { return language === 'es' ? COPY.es : COPY.en; }
