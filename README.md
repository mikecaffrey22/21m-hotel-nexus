# The 21M Hotel — Nexus

Transmedia universe hub. React + Vite, ready for Vercel.

## Deploy to Vercel (3 steps)

### 1. Install dependencies
```bash
npm install
```

### 2. Test locally
```bash
npm run dev
```
Open http://localhost:5173

### 3. Deploy
```bash
npx vercel
```
Follow the prompts. That's it. Live URL in 30 seconds.

## Before you deploy

**Bitcoin address:** Open `src/App.jsx` and replace `YOUR_BITCOIN_ADDRESS_HERE` with your actual BTC address on line 5.

## File structure

```
21m-hotel-nexus/
├── public/
│   └── books/           ← .docx files served as downloads
│       ├── Every-Floor-Between-Us-Complete.docx
│       ├── Dead-Key.docx
│       ├── The-Meridian.docx
│       ├── The-Last-Warm-Thing.docx
│       ├── The-Halving.docx
│       └── The-Ascent.docx
├── src/
│   ├── App.jsx          ← The Nexus app
│   └── main.jsx         ← Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Adding new books

Edit the `BOOKS` array in `src/App.jsx`. Add the .docx to `public/books/`. The download link auto-wires from the `file` field.

## Canon Bible version

Each book entry has a `bible` field tracking which version of the World Bible it was written against.
