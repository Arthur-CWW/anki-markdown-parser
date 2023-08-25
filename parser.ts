function lineParser(md: string) {
  let result = '';
  let isBold = false;
  let isItalic = false;
  const whitespace = [' ', '\n', '\t'];
  let line = '';
  const touching = (str: string, i: number, open: boolean) =>
    open
      ? str[i + 1] !== undefined && whitespace.findIndex((char) => char === str[i + 1]) === -1
      : str[i - 1] !== undefined &&
        whitespace.findIndex((char) => char === str[i - 1]) ===
          -1; /**if open then the next character must be non white , if closing then the previous character must be non white */

  md.split('<br>').forEach((line) => {
    if (line.startsWith('#')) {
      const headerLevel = line.match(/#+/)![0].length;

      line = line.replace(/#+/, '');
      result += `<h${headerLevel}> ${line}</h${headerLevel}>\n`;
      return;
    }
    // line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // line = line.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
    // line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // line = line.replace(/\_(.*?)\_/g, '<em>$1</em>');
    // for(let i = 0; i < line.length; i++) {
    //   if((line[i] === '*' && line[i+1] === '*' )&& touching(line,i,isBold)) {
    //     isBold = !isBold;
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    line = line.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    line = line.replace(/\_(.*?)\_/g, '<em>$1</em>');

    console.log(line);
    result += line + '<br>';
  });

  return result;
}

// function processContent(str: string) {
//   const PLACEHOLDER = '%%ANKI_MATHJAX%%';
//   const ankiRegex = /<anki-mathjax>.*?<\/anki-mathjax>/g;

//   // Temporarily store <anki-mathjax> content
//   const ankiMatches = [...str.matchAll(ankiRegex)];

//   // Replace <anki-mathjax> content with placeholder
//   str = str.replace(ankiRegex, PLACEHOLDER);

//   // Apply the parseMarkdown function
//   str = lineParser(str);

//   // Restore the <anki-mathjax> content
//   ankiMatches.forEach((match) => {
//     str = str.replace(PLACEHOLDER, match[0]);
//   });

//   return str;
// }

const inputString = `** Measurable Space**<br>- **Definition**: A set equipped with a sigma-algebra.<br>- **Purpose**: Provides structure to define measures.<br><anki-mathjax> fdsjakfj</anki-mathjax>`;

console.log(lineParser(inputString));

// Basic tests
const markdown = `
# Heading 1
## Heading 2
*italic* and also _italic_
**bold** and also __bold__
`;

console.log(lineParser(markdown));

// const test = (input, expected) => {
//   const result = lineParser(input);
//   console.log(result === expected ? 'PASS' : 'FAIL', result);
// };

// test('# Test Header', '<h1> Test Header</h1>\n');
// test('*italic*', '<em>italic</em>');
// test('**bold**', '<strong>bold</strong>');
