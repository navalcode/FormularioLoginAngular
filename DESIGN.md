# Form layout and behavior

An independently generated desktop reference informed the implementation before source changes: a thin ruled header, a large left heading and a right-aligned form without an enclosing card. The code keeps that composition, with a 1206 px container, 100 px column gap, a 440 px form and a heading limited by its available width. Below 820 px the form stacks below the introduction; content grows normally rather than being clipped into a fixed viewport.

Outfit is loaded locally under OFL. Warm paper `#f8f4ec`, charcoal `#252420` and copper `#934b32` carry text, focus, errors and primary action. Inputs use 12 px radii and a 64 px minimum height; buttons and error links have 48 px minimum targets. A geometric sans serves both heading and controls. No stock image, external font request, repeated card grid or decorative menu is needed for a two-field exercise.

Copy describes the action: Check form / Comprobar formulario, Clear / Limpiar and Show/Hide / Mostrar/Ocultar. The introduction explains the local scope once. A successful check reports that the password was cleared, without inventing a signed-in session. Validation points to a correction. Error links, aria-describedby, aria-invalid and first-error focus connect the summary to the controls. Status uses a live region; its key is translated when language changes.

Spanish is the initial language and English is the resource fallback. Language switches keep drafts, visibility and validation state. Clear removes values/errors, masks the password and focuses email. A valid check clears/masks only the password and retains email. The app does not print input values, send them or persist them.

Only a brief 180 ms status entry animates; prefers-reduced-motion disables it. There is no scroll narrative or GSAP dependency. The generated reference is a design aid, not a runtime asset or evidence of execution. Public screenshots come from the production bundle; the executed scope and limitations are in [verification](docs/VERIFICATION.md).
