# IAIRSI 2026 — Landing page

Sitio estático (HTML + CSS + JS, sin build) del **Intercambio Academia-Industria: Robótica y Sistemas Inteligentes**, 4 de noviembre de 2026, Tec de Monterrey.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Toda la página: hero, ejes, evento, agenda, ponentes, lugar, CTA |
| `styles.css` | Estilos (colores en las variables de `:root`) |
| `main.js` | Cuenta regresiva y resaltado "En curso" de la agenda el día del evento |
| `iairsi-2026.ics` | Archivo de calendario del botón "Agregar a mi calendario" |
| `favicon.svg` | Ícono de la pestaña |

## Probar en local

```bash
npx serve .
# o
python3 -m http.server 8000
```

## Editar contenido

- **Agenda**: cada bloque es un `<li class="slot">` en `index.html`. Los atributos `data-start` / `data-end` (formato 24 h, hora de Monterrey) controlan el resaltado en vivo.
- **Link de registro**: busca `forms.gle` en `index.html` (aparece 3 veces) y en `iairsi-2026.ics`.
- **Logos de organizadores**: el footer usa texto; para usar los logos oficiales, agrégalos en una carpeta `assets/` y reemplaza los `<li>` de `.orgs` por `<img>`.
