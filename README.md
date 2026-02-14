# Tarot Companion

## View locally
1. Start a local server from the repo root:
   ```bash
   python -m http.server 8000 --directory /workspace/Tarot
   ```
2. Open the site in your browser:
   - Homepage: http://127.0.0.1:8000/index.html
   - Cards index: http://127.0.0.1:8000/cards/index.html
   - Major Arcana: http://127.0.0.1:8000/cards/major_arcana/index.html
   - Spread builder: http://127.0.0.1:8000/spread.html

## NFC tap-to-build spread
Program each NFC card with this URL format:

```text
https://YOUR-SITE.netlify.app/spread.html?tap=CARD-SLUG
```

Examples:
- `the-fool`
- `the-moon`
- `ace-of-cups`

The spread page stores up to three taps in order:
1. Past
2. Present
3. Future

Use **Clear tapped spread** to reset.

## Netlify 404 fix
If you see Netlify "Page not found":
1. Open your Netlify site root directly (`https://YOUR-SITE.netlify.app/`).
2. Confirm `index.html` loads from root.
3. Make sure you deployed the repository root folder (`Tarot`) and not its parent.
4. Re-deploy and test `https://YOUR-SITE.netlify.app/spread.html`.
