let DEBUG = true;

function lineParser(md: string) {
  let result = '';
  const whitespace = [' ', '\n', '\t'];
  // const touching = (str: string, i: number, open: boolean) =>
  //   open
  //     ? str[i + 1] !== undefined && whitespace.findIndex((char) => char === str[i + 1]) === -1
  //     : str[i - 1] !== undefined &&
  //       whitespace.findIndex((char) => char === str[i - 1]) ===
  //         -1; /**if open then the next character must be non white , if closing then the previous character must be non white */

  md.split('<br>').forEach((line) => {
    if (line.startsWith('#')) {
      const headerLevel = line.match(/#+/)![0].length;

      line = line.replace(/#+/, '');
      result += `<h${headerLevel}> ${line}</h${headerLevel}>\n`;
      return;
    }
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    line = line.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    line = line.replace(/\_(.*?)\_/g, '<em>$1</em>');

    DEBUG && console.log(line);
    result += line + '<br>';
  });

  return result;
}

function processContent(str: string) {
  DEBUG && console.log('Preprocessing', str.slice(0, 100));
  const PLACEHOLDER = '%%ANKI_MATHJAX%%';
  const ankiRegex = /<anki-mathjax>.*?<\/anki-mathjax>/g;

  const ankiMatches = [...str.matchAll(ankiRegex)];

  str = str.replace(ankiRegex, PLACEHOLDER);

  // Apply the parseMarkdown function
  str = lineParser(str);

  // Restore the <anki-mathjax> content
  ankiMatches.forEach((match) => {
    str = str.replace(PLACEHOLDER, match[0]);
  });

  return str;
}

function main() {
  const examples = [
    `Of course! Let's break down the information into multiple "study cards".<br><br>---<br><br>**Card 1: Topological Space**<br>- **Definition**: A set <anki-mathjax> X </anki-mathjax> together with a collection <anki-mathjax> \tau </anki-mathjax> of subsets of <anki-mathjax> X </anki-mathjax> satisfying three properties.<br>- **Properties**:<br>&nbsp; 1. <anki-mathjax> X </anki-mathjax> and the empty set <anki-mathjax> \emptyset </anki-mathjax> are in <anki-mathjax> \tau </anki-mathjax>.<br>&nbsp; 2. The intersection of any finite number of sets in <anki-mathjax> \tau </anki-mathjax> is in <anki-mathjax> \tau </anki-mathjax>.<br>&nbsp; 3. The union of any number of sets in <anki-mathjax> \tau </anki-mathjax> is in <anki-mathjax> \tau </anki-mathjax>.<br>- **Key Term**: Open sets are members of <anki-mathjax> \tau </anki-mathjax>.<br><br>---<br><br>**Card 2: Closed Sets in Topology**<br>- **Definition**: A set in a topological space is "closed" if its complement is "open".<br><br>---<br><br>**Card 3: Measurable Space**<br>- **Definition**: A set equipped with a sigma-algebra.<br>- **Purpose**: Provides structure to define measures.<br><br>---<br><br>**Card 4: Sigma-Algebra**<br>- **Definition**: A collection of subsets that includes the entire set, is closed under complementation, and is closed under countable unions.<br>- **Relation to Topology**: Generated by the open sets, leading to Borel sigma-algebra.<br><br>---<br><br>**Card 5: Borel Sets &amp; Borel Measure Space**<br>- **Borel Sets**: Generated by the open sets of a topological space. Form a Borel sigma-algebra.<br>- **Borel Measure Space**: A space that becomes when a measure is defined on the Borel sets.<br><br>---<br><br>**Card 6: Measurable Functions &amp; Measure Theory**<br>- **Definition**: A function is "measurable" if the preimage of every Borel set is a measurable set.<br>- **Importance of Topology**: A well-defined notion of "open set" aids in establishing when a function is measurable.<br><br>---<br><br>You can then use these cards to review the basic concepts of topological spaces, measure theory, and their relationship.`,

    `** Measurable Space**<br>- **Definition**: A set equipped with a sigma-algebra.<br>- **Purpose**: Provides structure to define measures.<br><anki-mathjax> fdsjakfj</anki-mathjax>`,
    `
# Heading 1
## Heading 2
*italic* and also _italic_
**bold** and also __bold__
`,
  ];

  const test = (teststr: string) => {
    console.log(processContent(teststr));
    console.log(lineParser(teststr));
  };
  // console.log(processContent(examples[2]));
  // console.log(lineParser(examples[2]));

  test(examples[0]);
  test(examples[1]);
}
main();
