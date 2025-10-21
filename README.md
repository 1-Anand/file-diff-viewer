# File Diff Viewer

This project is a simple web app that lets you compare two plain‑text files directly in the browser. Upload an “original” and a “modified” file, click **Compare**, and the differences will be highlighted in a diff viewer. Added lines appear in green, removed lines in red and unchanged lines in light grey.

## How It Works

- The app uses the open‑source **jsdiff** library to compute line‑based differences between the two files. jsdiff is available as a CDN resource on cdnjs; a minified script can be loaded via `https://cdnjs.cloudflare.com/ajax/libs/jsdiff/8.0.2/diff.min.js`【30450747406193†L36-L38】.
- When you click **Compare**, JavaScript reads each selected file using the `FileReader` API, then passes their contents to `JsDiff.diffLines()` to compute a diff array.
- The script iterates over the diff array and wraps added, removed and unchanged sections in `<span>` tags with appropriate CSS classes. These classes define background colours and text colours for visual clarity.

## Project Structure

```
file-diff-viewer/
├── index.html   # Main page: file inputs, compare button and result container
├── diff.js      # JavaScript logic: reads files, computes diff and renders HTML
├── styles.css   # Basic styling for layout and diff highlighting
└── README.md    # This file
```

## Running Locally

1. Copy the contents of the `file-diff-viewer` directory to your computer.
2. Open `index.html` in a modern web browser (no server needed). Allow access to the jsdiff CDN if prompted.
3. Choose two `.txt` files using the **Original file** and **Modified file** inputs.
4. Click **Compare**. The differences will be displayed below, with additions and deletions highlighted.

## Deploying to GitHub Pages

You can host this diff viewer online using GitHub Pages, similar to your typing practice site:

1. **Create a new repository** on GitHub (e.g., `file-diff-viewer`). You can do this by clicking **New repository** from the GitHub interface【21853405724016†L84-L107】.
2. Clone the repository to your local machine and copy the files (`index.html`, `diff.js`, `styles.css`, `README.md`) into it.
3. Commit and push the changes:

   ```sh
   git add .
   git commit -m "Add file diff viewer"
   git push origin main
   ```

4. **Enable GitHub Pages** for the repository: In the **Settings** of your repository, navigate to **Pages** under **Code and automation**. Under **Build and deployment → Source**, select **Deploy from a branch**, then choose the `main` branch and the root folder【937884954513635†L108-L138】. Click **Save**.
5. After a few minutes, your site will be available at `https://<your-username>.github.io/<repository-name>/`. For instance, if your GitHub username is `octocat` and the repo is `file-diff-viewer`, the diff viewer will be hosted at `https://octocat.github.io/file-diff-viewer/`.

Use this project to compare any two text files quickly, either locally or via a simple hosted page.

---
