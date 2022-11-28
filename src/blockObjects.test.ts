import { RichText, richText } from './richTextObject';
import {
  bookmark,
  breadcrumb,
  bulletedListItem,
  callout,
  code,
  column,
  columnList,
  divider,
  embed,
  equation,
  file,
  heading1,
  heading2,
  heading3,
  image,
  linkToPage,
  numberedListItem,
  paragraph,
  pdf,
  quote,
  syncedBlock,
  table,
  tableOfContents,
  tableRow,
  template,
  todo,
  toggle,
  video,
} from './blockObjects';
import { BlockObjectRequestWithoutChildren } from './customTypes';

type Text = string | RichText;
type TextForBlock = Text | Text[];

const testCasesForText: TextForBlock[] = [
  'test',
  richText('test'),
  ['test', richText('test2', { bold: true })], // mixed array
  [richText('test'), richText('test2', { bold: true })],
];

describe('blockObjects', () => {
  describe('paragraph', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(paragraph(text)).toMatchSnapshot();
    });

    test('with options', () => {
      expect(
        paragraph('test', {
          blockColor: 'red_background',
          children: [paragraph('test2')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('heading1', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(heading1(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        heading1('test', {
          blockColor: 'gray_background',
          isToggleable: true,
          children: [
            heading1('test', {
              blockColor: 'red_background',
            }),
          ],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('heading2', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(heading2(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        heading2('test', {
          blockColor: 'gray_background',
          isToggleable: true,
          children: [
            heading2('test', {
              blockColor: 'red_background',
            }),
          ],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('heading3', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(heading3(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        heading3('test', {
          blockColor: 'gray_background',
          isToggleable: true,
          children: [
            heading3('test', {
              blockColor: 'red_background',
            }),
          ],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('callout', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(callout(text, '🔥')).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        callout('test', '🔥', {
          blockColor: 'gray_background',
          children: [callout('test', '🔥')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('quote', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(quote(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        quote('test', {
          blockColor: 'gray_background',
          children: [quote('test')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('bulletedListItem', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(bulletedListItem(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        bulletedListItem('test', {
          blockColor: 'gray_background',
          children: [bulletedListItem('test')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('numberedListItem', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(numberedListItem(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        numberedListItem('test', {
          blockColor: 'gray_background',
          children: [numberedListItem('test')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('todo', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(todo(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        todo('test', {
          checked: true,
          blockColor: 'gray_background',
          children: [
            todo('test', {
              checked: false,
            }),
          ],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('toggle', () => {
    test.each<TextForBlock>(testCasesForText)('no option', (text) => {
      expect(toggle(text)).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        toggle('test', {
          blockColor: 'gray_background',
          children: [toggle('test')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('code', () => {
    test.each<TextForBlock>(testCasesForText)('code', (text) => {
      expect(code(text, 'javascript')).toMatchSnapshot();
    });
  });

  describe('embed', () => {
    test('no option', () => {
      expect(embed('test')).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        embed('test', {
          captions: [richText('test2')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('image', () => {
    test('no option', () => {
      expect(image('url')).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        image('url', {
          captions: [richText('test2')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('video', () => {
    test('no option', () => {
      expect(video('url')).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        video('url', {
          captions: [richText('test2')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('file', () => {
    test('no option', () => {
      expect(file('url')).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        file('url', {
          captions: [richText('test2')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('pdf', () => {
    test('no option', () => {
      expect(pdf('url')).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        pdf('url', {
          captions: [richText('test2')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('bookmark', () => {
    test('no option', () => {
      expect(bookmark('url')).toMatchSnapshot();
    });

    test('with option', () => {
      expect(
        bookmark('url', {
          captions: [richText('test2')],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('equation', () => {
    test('default', () => {
      expect(equation('1 + 1')).toMatchSnapshot();
    });
  });

  describe('divider', () => {
    test('default', () => {
      expect(divider()).toMatchSnapshot();
    });
  });

  describe('tableOfContents', () => {
    test('no option', () => {
      expect(tableOfContents()).toMatchSnapshot();
    });

    test('with option', () => {
      expect(tableOfContents('gray_background')).toMatchSnapshot();
    });
  });

  describe('breadcrumb', () => {
    test('default', () => {
      expect(breadcrumb()).toMatchSnapshot();
    });
  });

  describe('columns', () => {
    test('default', () => {
      expect(
        columnList([
          column([
            heading1('test'),
            paragraph(
              richText('test', {
                bold: true,
              }),
            ),
          ]),
          column([heading1('test'), paragraph('test')]),
        ]),
      ).toMatchSnapshot();
    });
  });

  describe('template', () => {
    test.each<TextForBlock>(testCasesForText)('default', (text) => {
      expect(template(text, [paragraph('test')])).toMatchSnapshot();
    });
  });

  describe('linkToPage', () => {
    test('default', () => {
      expect(linkToPage('pageId')).toMatchSnapshot();
    });
  });

  describe('syncedBlock', () => {
    test.each<
      [string | undefined, BlockObjectRequestWithoutChildren[] | undefined]
    >([
      [undefined, undefined],
      [undefined, [paragraph('test')]],
      ['blockId', undefined],
      ['blockId', [paragraph('test')]],
    ])('default', (blockId, children) => {
      expect(syncedBlock(blockId, children)).toMatchSnapshot();
    });
  });

  describe('table', () => {
    test.each<
      [number, boolean | undefined, boolean | undefined, RichText[][][]]
    >([
      [2, undefined, undefined, [[[richText('test')]]]],
      [2, true, undefined, [[[richText('test')]]]],
      [2, undefined, true, [[[richText('test')]]]],
    ])('default', (width, hasColumnHeader, hasRowHeader, rows) => {
      expect(
        table(
          width,
          rows.map((row) => tableRow(row)),
          {
            has_column_header: hasColumnHeader,
            has_row_header: hasRowHeader,
          },
        ),
      ).toMatchSnapshot();
    });
  });
});
