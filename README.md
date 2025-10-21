# Text Diff Viewer

Compare two pieces of text directly in your browser. This small web
app lets you paste or type an “original” and a “modified” text into
side‑by‑side textareas, then highlights the differences. It uses
the [jsdiff](https://cdnjs.cloudflare.com/ajax/libs/jsdiff/8.0.2/diff.min.js) library
loaded from the cdnjs CDN【30450747406193†L36-L38】 to compute line‑level diffs on the client.

## Features

- ✏️ **Copy & Paste** – Paste or type text directly into the two input
  areas; no file upload required.
- 🎨 **Colour‑coded output** – Added lines appear on a green
  background, removed lines on red, unchanged lines on light grey.
- 🖥 **Runs in the browser** – All diff processing happens client‑side
  using jsdiff. No backend or server needed.

## How it works

The app consists of a simple HTML page (`index.html`), a small
stylesheet (`styles.css`) and a script (`diff.js`). When you click the
**Compare** button, `diff.js` reads the contents of the two
textareas, calls `JsDiff.diffLines()` to compute differences and
renders each fragment inside a `<pre>` element with classes
`added`, `removed` or `unchanged` so it can be styled via CSS. The
jsdiff library is pulled from the cdnjs CDN【30450747406193†L36-L38】.

## Running locally

To try it on your machine:

1. Clone or download this repository.
2. Open `index.html` in a modern web browser. No build step is
   necessary.
3. Paste or type text into both input boxes and click **Compare** to
   view the diff.

## Deploying with GitHub Pages

You can host this tool for free using GitHub Pages:

1. Create a new repository on GitHub. The [GitHub Pages
   quickstart guide](https://docs.github.com/en/pages/quickstart) shows
   how to create a repo and enable Pages【21853405724016†L84-L116】.
2. Copy the contents of this folder (`index.html`, `styles.css` and
   `diff.js`) into the new repository and commit/push your changes.
3. In your repository, go to **Settings → Pages**. Under **Build and
   deployment**, select **Deploy from a branch**, choose your
   `main` branch and `/ (root)` folder, then click **Save**
  【937884954513635†L108-L138】.
4. After a minute or two, GitHub Pages will publish your site. The
   URL will look like `https://<username>.github.io/<repository-name>/`.

Now anyone can use your copy‑and‑paste diff viewer by visiting that
link.
