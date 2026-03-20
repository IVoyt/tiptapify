import * as FS from "node:fs";
import * as https from "node:https";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = 'src/extensions/charmap';

const htmlEntities: Record<string, string> = {
  '&quot;': '"',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&apos;': "'",
  '&nbsp;': ' ',
  '&ldquo;': '"',
  '&rdquo;': '"',
  '&lsquo;': "'",
  '&rsquo;': "'",
  '&laquo;': '«',
  '&raquo;': '»',
  '&ndash;': '–',
  '&mdash;': '—',
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
};

function decodeHtmlEntity(str: string): string {
  return str.replace(/&[^;]+;/g, (match) => htmlEntities[match] || match);
}

interface CharData {
  char: string;
  code: string;
  css: string;
  type: string;
  name: string;
}

interface CharJson {
  characters: CharData[];
}

const url = 'https://raw.githubusercontent.com/elvessousa/charmap/master/data/chars.json';

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk: string) => {
    data += chunk;
  });

  response.on('end', () => {
    const json: CharJson = JSON.parse(data);
    const characters = json.characters;

    const groups = [...new Set(characters.map((char) => char.type))];

    const categoryMapping: Record<string, string> = {
      space: 'space',
      punctuation: 'punctuation',
      symbol: 'symbols',
      math: 'math',
      currency: 'currency',
      greek: 'greek',
      extended: 'extended_letters',
      diacritic: 'diacritics',
      typography: 'typography',
      cyrillic: 'cyrillic',
      hebrew: 'hebrew',
      arrow: 'arrows',
      box: 'box_drawing'
    };

    const orderMapping: Record<string, number> = {
      space: 1,
      punctuation: 2,
      symbols: 3,
      math: 4,
      currency: 5,
      greek: 6,
      extended_letters: 7,
      diacritics: 8,
      typography: 9,
      cyrillic: 10,
      hebrew: 11,
      arrows: 12,
      box_drawing: 13
    };

    groups.forEach((group) => {
      if (!group || group.trim() === '' || group === 'space') {
        return;
      }
      const groupName = categoryMapping[group] || group;
      const groupChars = characters
        .filter((char) => char.type === group)
        .map((char) => ({
          name: char.name,
          char: char.char === 'tab' ? '\t' : char.char === 'newline' ? '\n' : decodeHtmlEntity(char.char),
          codes: [char.code]
        }));

      FS.writeFile(
        `${__dirname}/${path}/${groupName}.ts`,
        'export default ' + JSON.stringify(groupChars, null, 2),
        'utf8',
        (error) => {
          if (error) {
            console.error(error);
          }
        }
      );
    });

    const indexContent = groups.filter((group) => group && group.trim() !== '' && group !== 'space').map((group) => {
      const groupName = categoryMapping[group] || group;
      const order = orderMapping[groupName] || 99;
      return {
        name: groupName,
        order
      };
    }).sort((a, b) => a.order - b.order);

    console.log('Generated categories:', indexContent.map(c => c.name).join(', '));
  });
}).on('error', (error) => {
  console.error('Error fetching data:', error);
});
