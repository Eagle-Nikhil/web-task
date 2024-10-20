const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');

// Function to update the preview
function updatePreview() {
    const markdown = markdownInput.value;
    const html = convertMarkdownToHTML(markdown);
    preview.innerHTML = html;
}

// Function to convert Markdown to HTML
function convertMarkdownToHTML(markdown) {
    // This is a very basic Markdown to HTML converter
    // It handles only some common Markdown syntax
    let html = markdown
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/\n/g, '<br>');
    return html;
}

// Function to clear the input and preview
function clearInput() {
    markdownInput.value = '';
    updatePreview();
}

// Function to download HTML
function downloadHTML() {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Preview</title>
</head>
<body>
    ${preview.innerHTML}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown_preview.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listeners
markdownInput.addEventListener('input', updatePreview);
document.getElementById('clear').addEventListener('click', clearInput);
document.getElementById('download').addEventListener('click', downloadHTML);

// Initial preview update
updatePreview(); // Update the preview initially