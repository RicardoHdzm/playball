// Arma prototipo-playball.html, el archivo que se publica como artifact:
// index.html con css/playball.css incrustado.
//
// Por qué: un artifact publicado no carga hojas de estilo externas (solo Google Fonts),
// así que el CSS vive aparte para trabajar y se incrusta únicamente al publicar.
//
// Uso: node tools/build-artifact.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css", "playball.css"), "utf8");
const link = '<link rel="stylesheet" href="css/playball.css">';

if (html.split(link).length !== 2){
  console.error(`index.html debe tener exactamente un ${link}`);
  process.exit(1);
}

// El doctype y los meta de index.html son para GitHub Pages; el artifact ya los pone.
const soloIndex = /^<!doctype html>\n<!-- solo-index[\s\S]*?<!-- \/solo-index -->\n/i;
const out = html
  .replace(soloIndex, "")
  .replace(link, () => `<style>\n${css.replace(/\n+$/, "")}\n</style>`);
fs.writeFileSync(path.join(root, "prototipo-playball.html"), out);
console.log(`prototipo-playball.html listo · ${Math.round(out.length / 1024)} KB`);
