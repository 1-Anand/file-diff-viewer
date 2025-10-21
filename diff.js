// diff.js for Text Diff Viewer
// This script compares the contents of two textareas and displays the
// differences using the jsdiff library. The view highlights added
// lines in green, removed lines in red, and unchanged lines in a light
// grey. Unlike the file-based diff viewer, this variant lets users
// paste or type text directly for comparison.

// Obtain references to the textareas, button and result container
const textArea1 = document.getElementById('text1');
const textArea2 = document.getElementById('text2');
const compareBtn = document.getElementById('compareBtn');
const resultDiv = document.getElementById('result');

// Listen for clicks on the Compare button
compareBtn.addEventListener('click', () => {
  // Read the values from both textareas
  const originalText = textArea1.value;
  const modifiedText = textArea2.value;

  // If either field is empty, alert the user
  if (!originalText || !modifiedText) {
    alert('Please enter or paste text into both fields before comparing.');
    return;
  }

  // Generate and display the diff
  showDiff(originalText, modifiedText);
});

/**
 * Compute the diff between two strings and render the result. Uses
 * JsDiff.diffLines to produce a line-by-line comparison. Each diff
 * fragment is wrapped in a span with a class corresponding to its
 * type (added, removed or unchanged) so it can be styled via CSS.
 *
 * @param {string} text1 The original text
 * @param {string} text2 The modified text
 */
function showDiff(text1, text2) {
  // Compute the differences as an array of parts
  const diff = JsDiff.diffLines(text1, text2);

  // Build HTML to represent the diff. A <pre> block preserves
  // whitespace and line breaks, while spans allow per-part styling.
  let html = '<pre>';
  diff.forEach(part => {
    // Determine class name based on the part type
    let className;
    if (part.added) {
      className = 'added';
    } else if (part.removed) {
      className = 'removed';
    } else {
      className = 'unchanged';
    }
    // Escape HTML special characters to prevent injection and
    // preserve angle brackets and ampersands in the diff view
    const escaped = part.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    html += `<span class="${className}">${escaped}</span>`;
  });
  html += '</pre>';
  resultDiv.innerHTML = html;
}
