// diff.js
// This script compares two uploaded text files and displays the differences
// using the jsdiff library. Added lines are highlighted in green, removed
// lines in red, and unchanged lines in light grey.

// Get references to DOM elements
const fileInput1 = document.getElementById('file1');
const fileInput2 = document.getElementById('file2');
const compareBtn = document.getElementById('compareBtn');
const resultDiv = document.getElementById('result');

// Listen for compare button click
compareBtn.addEventListener('click', () => {
  const file1 = fileInput1.files[0];
  const file2 = fileInput2.files[0];

  if (!file1 || !file2) {
    alert('Please select two text files to compare.');
    return;
  }

  // Read both files and perform diff when both are loaded
  Promise.all([readFile(file1), readFile(file2)]).then(([text1, text2]) => {
    showDiff(text1, text2);
  });
});

// Helper to read a file as text
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}

// Generate and display the diff
function showDiff(text1, text2) {
  // Use JsDiff to compute line-based differences
  const diff = JsDiff.diffLines(text1, text2);

  // Build HTML for the diff output
  let html = '<pre>';

  diff.forEach(part => {
    // Determine the style class based on added/removed/unchanged
    let className;
    if (part.added) {
      className = 'added';
    } else if (part.removed) {
      className = 'removed';
    } else {
      className = 'unchanged';
    }
    // Escape HTML special characters in the text
    const escaped = part.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html += `<span class="${className}">${escaped}</span>`;
  });

  html += '</pre>';
  resultDiv.innerHTML = html;
}
