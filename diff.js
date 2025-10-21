// diff.js for Multi‑Input Diff Viewer
//
// This script allows users to compare two pieces of text using either
// file uploads or direct input. It reads the content of each side,
// computes a line‑by‑line diff using jsdiff, and renders a
// side‑by‑side table that highlights additions (green), removals
// (red) and unchanged lines. The design resembles common diff views
// seen on GitHub and other version control platforms.

// Grab references to the DOM elements
const fileInput1 = document.getElementById('file1');
const fileInput2 = document.getElementById('file2');
const textArea1 = document.getElementById('text1');
const textArea2 = document.getElementById('text2');
const compareBtn = document.getElementById('compareBtn');
const resultDiv = document.getElementById('result');

// Set up event listener on the Compare button
compareBtn.addEventListener('click', () => {
  // Determine input sources for each side: file takes precedence
  const file1 = fileInput1.files[0];
  const file2 = fileInput2.files[0];
  const text1 = textArea1.value;
  const text2 = textArea2.value;

  // If both sides lack input, alert the user
  if ((!file1 && !text1) || (!file2 && !text2)) {
    alert('Please provide input for both sides. You can either upload a file or paste text.');
    return;
  }

  // Helper to return a promise resolving to the text content
  const getContent = (file, text) => {
    if (file) {
      return readFileAsText(file);
    }
    return Promise.resolve(text);
  };

  // Read both inputs (file or text) in parallel
  Promise.all([getContent(file1, text1), getContent(file2, text2)]).then(([oldContent, newContent]) => {
    // Compute diff and render the table
    renderSideBySideDiff(oldContent, newContent);
  }).catch(error => {
    console.error('Error reading files:', error);
    alert('An error occurred while reading the files.');
  });
});

/**
 * Read a File object and return a promise that resolves with its text
 * contents.
 *
 * @param {File} file The file to read
 * @returns {Promise<string>} A promise that resolves with the file contents
 */
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = err => reject(err);
    reader.readAsText(file);
  });
}

/**
 * Compute a side‑by‑side diff of two strings and render it as an HTML
 * table. It uses JsDiff.diffLines to generate an array of diff
 * fragments then builds a row for each line, aligning additions and
 * deletions opposite blank cells when necessary.
 *
 * @param {string} oldStr The original text
 * @param {string} newStr The modified text
 */
function renderSideBySideDiff(oldStr, newStr) {
  // Compute diff parts using jsdiff
  const diff = JsDiff.diffLines(oldStr, newStr);

  let lineNumOld = 1;
  let lineNumNew = 1;
  const rows = [];

  diff.forEach(part => {
    // Split the fragment value into lines; remove trailing empty line
    const lines = part.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip the final empty line (diffLines always ends with \n)
      if (line === '' && i === lines.length - 1) {
        continue;
      }
      if (part.added) {
        // Added: blank on old side, line on new side
        rows.push({
          type: 'added',
          oldNum: '',
          oldText: '',
          newNum: lineNumNew++,
          newText: line
        });
      } else if (part.removed) {
        // Removed: line on old side, blank on new side
        rows.push({
          type: 'removed',
          oldNum: lineNumOld++,
          oldText: line,
          newNum: '',
          newText: ''
        });
      } else {
        // Unchanged: line on both sides
        rows.push({
          type: 'unchanged',
          oldNum: lineNumOld++,
          oldText: line,
          newNum: lineNumNew++,
          newText: line
        });
      }
    }
  });

  // Build HTML table
  let html = '<table class="diff-table">';
  html += '<thead><tr><th class="line-num">Old #</th><th>Original</th><th class="line-num">New #</th><th>Modified</th></tr></thead>';
  html += '<tbody>';
  rows.forEach(row => {
    html += `<tr class="${row.type}">`;
    html += `<td class="line-num">${row.oldNum}</td>`;
    html += `<td>${escapeHtml(row.oldText)}</td>`;
    html += `<td class="line-num">${row.newNum}</td>`;
    html += `<td>${escapeHtml(row.newText)}</td>`;
    html += '</tr>';
  });
  html += '</tbody></table>';

  resultDiv.innerHTML = html;
}

/**
 * Escape HTML special characters to prevent injection and ensure
 * characters like < and > render correctly in preformatted output.
 *
 * @param {string} str The string to escape
 * @returns {string} The escaped string
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
