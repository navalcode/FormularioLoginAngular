# Práctica de formularios con Angular

[English](README.md)

Ejercicio pequeño de Angular 12 con formularios dirigidos por plantilla. Permite introducir un email y una contraseña de ejemplo, comprobar los campos, corregir errores, mostrar u ocultar la contraseña y limpiar el formulario. Arranca en español y se puede cambiar a inglés sin perder el borrador.

La validación es local: no autentica usuarios, no crea cuentas ni envía los valores. Tras una comprobación válida, borra la contraseña y conserva el email para repetir la práctica. Se han eliminado el registro de email/contraseña en consola y los botones de menú, favorito y compartir que no tenían función.

![Formulario ejecutado en español](docs/screenshots/form-desktop.png)

## Ejecutar

Usa **Node 14.21.3 / npm 6** en un entorno aislado para reproducir el proyecto histórico:

```sh
npm ci
npm start -- --host 127.0.0.1
# Abrir http://127.0.0.1:4200
npm run build -- --configuration production
```

El resultado de producción se genera en `dist/FormularioLogin/`. Se conservan las versiones, el lockfile y los presupuestos de tamaño originales. Angular incluye 12.2 entre las [versiones sin soporte](https://angular.dev/reference/versions). Poder ejecutar la práctica no acredita seguridad actual de sus dependencias ni la convierte en una base recomendada para un sistema de acceso de producción.

## Probar el recorrido

1. Pulsa **Comprobar formulario** con los campos vacíos. Los errores enlazan con cada campo y el foco pasa al primero que necesita corregirse.
2. Introduce `alex@example.test` y una contraseña de ejemplo. Se rechaza un email mal formado y se exige una contraseña; no se aplica una política de fortaleza inventada ni se comprueban credenciales en un servidor.
3. Prueba **Mostrar/Ocultar contraseña** y comprueba el formulario. La contraseña se borra y vuelve a ocultarse; el resultado se anuncia sin imprimir los valores introducidos.
4. Cambia de idioma con un borrador o errores presentes. El estado se conserva y los textos cambian.
5. **Limpiar** vacía los campos, elimina los errores, oculta la contraseña y devuelve el foco al email. Recargar inicia un formulario vacío en español.

El email admite hasta 254 caracteres y la contraseña hasta 128. Este recorrido no envía peticiones ni escribe cookies o almacenamiento de la aplicación. El autocompletado y el gestor de contraseñas pertenecen al navegador y no están validados por esta práctica.

## Código y comprobaciones

- [`email.component.ts`](src/app/email/email.component.ts) gestiona el estado, el foco del primer error y la limpieza. Su plantilla usa `NgForm`/`NgModel` de Angular con controles nativos etiquetados.
- [`i18n.ts`](src/app/i18n.ts) reúne los textos ES/EN y el fallback inglés. El componente raíz actualiza idioma y título del documento; cambiar de idioma conserva la misma instancia del formulario.
- [`app.component.spec.ts`](src/app/app.component.spec.ts) prueba corrección, foco, ocultación, cambios de idioma y ausencia de escritura en consola/almacenamiento. Los tests de la cabecera cubren los controles de idioma.
- El modelo `Login` y el módulo de imports Material anteriores permanecen como código histórico; el formulario activo no los usa. No se añade un servicio de autenticación ni otro framework.

```sh
npm test -- --watch=false --browsers=ChromeHeadless
# Alternativa: conectar un navegador a la dirección local que imprime el runner.
npm test -- --watch=false --karma-config karma.manual.conf.js
```

La suite revisada tiene **20 tests**. [Verificación](docs/VERIFICATION.md), en inglés, separa las pruebas locales, los recorridos de navegador, los límites y la aserción fallida del scaffold original. No hay CI alojada ni runner end-to-end configurados. [DESIGN.md](DESIGN.md) explica composición, foco, textos y movimiento reducido.

## Historia y avisos

Se conservan el historial y las licencias de las dependencias. Las [notas originales del CLI](docs/ORIGINAL_README.md) quedan como documentación histórica; su sección `ng e2e` describe un runner que habría que añadir. El rediseño aporta código original y datos de prueba ficticios, sin material de empleadores o clientes. Outfit se sirve localmente con OFL; [avisos de terceros](THIRD_PARTY.md). Esta revisión no impone una licencia general nueva al repositorio histórico.
