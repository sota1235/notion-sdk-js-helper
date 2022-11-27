import { Client } from '@notionhq/client';
import {
  bulletedListItem,
  callout,
  code,
  column,
  columnList,
  divider,
  embed,
  heading1,
  heading2,
  heading3,
  image,
  numberedListItem,
  paragraph,
  quote,
  todo,
  toggle,
} from '../blockObjects';
import { richText } from '../richTextObject';

const sampleCodeBlock = (codes: string) => {
  return code(
    `await client.pages.create({
  // ...
  children: [
${codes
  .split('\n')
  .map((line) => `    ${line}`)
  .join('\n')}
  ],
});`,
    'typescript',
  );
};

const main = async () => {
  const client = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const codeHeading3 = [
    heading3('Code', {
      textAnnotation: {
        bold: true,
      },
    }),
    divider(),
  ];
  const resultHeading3 = [
    heading3('Result', {
      textAnnotation: {
        bold: true,
      },
    }),
    divider(),
  ];
  const sectionHeader = (text: string) =>
    heading1(text, {
      blockColor: 'gray_background',
    });

  return await client.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID as string,
    },
    properties: {},
    children: [
      sectionHeader('Paragraph block'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(`paragraph('paragraph'),
paragraph('colored paragraph', {
  blockColor: 'blue',
}),
paragraph('annotated paragraph', {
  textAnnotation: {
    bold: true,
  },
}),
paragraph('parent paragraph', {
  children: [
    paragraph('child paragraph'),
  ],
}),`),
        ]),
        column([
          ...resultHeading3,
          paragraph('paragraph'),
          paragraph('colored paragraph', {
            blockColor: 'blue_background',
          }),
          paragraph('annotated paragraph', {
            textAnnotation: {
              bold: true,
            },
          }),
          paragraph('parent paragraph', {
            children: [paragraph('child paragraph')],
          }),
        ]),
      ]),
      sectionHeader('Header blocks'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(`heading1('Heading1'),
heading2('Heading2'),
heading3('Heading3'),
heading1('Toggleable heading1', {
  isToggleable: true,
  children: [
    heading2('Decorated header', {
      blockColor: 'red_background',
      textAnnotation: {
        italic: true,
      },
    }),
  ],
}),`),
        ]),
        column([
          ...resultHeading3,
          heading1('Heading1'),
          heading2('Heading2'),
          heading3('Heading3'),
          heading1('Toggleable heading1', {
            isToggleable: true,
            children: [
              heading2('Decorated header', {
                blockColor: 'red_background',
                textAnnotation: {
                  italic: true,
                },
              }),
            ],
          }),
        ]),
      ]),
      sectionHeader('Callout blocks'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(`callout('Callout', '🥴'),
callout('Change color as you like', '🎨', {
  blockColor: 'red_background',
}),`),
        ]),
        column([
          ...resultHeading3,
          callout('Callout', '🥴'),
          callout('Change color as you like', '🎨', {
            blockColor: 'red_background',
          }),
        ]),
      ]),
      sectionHeader('Quote blocks'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(`quote('Some great articles.'),
quote('Some great articles with greate background color.', {
  blockColor: 'yellow_background',
}),`),
        ]),
        column([
          ...resultHeading3,
          quote('Some great articles.'),
          quote('Some great articles with greate background color.', {
            blockColor: 'yellow_background',
          }),
        ]),
      ]),
      sectionHeader('List blocks'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(`bulletedListItem('Bulleted list item 1'),
bulletedListItem('Bulleted list item 2', {
  children: [
    bulletedListItem('Child bulleted list item'),
  ],
}),
numberedListItem('Numbered list item 1'),
numberedListItem('Numbered list item 2', {
  children: [
    numberedListItem('Child numbered list item'),
  ],
}),`),
        ]),
        column([
          ...resultHeading3,
          bulletedListItem('Bulleted list item 1'),
          bulletedListItem('Bulleted list item 2', {
            children: [bulletedListItem('Child bulleted list item')],
          }),
          numberedListItem('Numbered list item 1'),
          numberedListItem('Numbered list item 2', {
            children: [numberedListItem('Child numbered list item')],
          }),
        ]),
      ]),
      sectionHeader('Todo blocks'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(`todo('TODO 1'),
todo('TODO 2', {
  checked: true,
  children: [
    todo('Child TODO'),
  ],
}),`),
        ]),
        column([
          ...resultHeading3,
          todo('TODO 1'),
          todo('TODO 2', {
            checked: true,
            children: [todo('Child TODO')],
          }),
        ]),
      ]),
      sectionHeader('Toggle blocks'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(`toggle('Toggle block', {
  children: [
    paragraph('Child paragraph'),
  ],
}),`),
        ]),
        column([
          toggle('Toggle block', {
            children: [paragraph('Child paragraph')],
          }),
        ]),
      ]),
      sectionHeader('Code blocks'),
      columnList([
        column([
          ...codeHeading3,
          sampleCodeBlock(
            `code("console.log('Code block is here!');", 'typescript'),`,
          ),
        ]),
        column([
          ...resultHeading3,
          code("console.log('Code block is here!');", 'typescript'),
        ]),
      ]),
      sectionHeader('External resources blocks'),
      columnList([
        column([...codeHeading3, sampleCodeBlock(``)]),
        column([
          ...resultHeading3,
          embed('https://example.com/', {
            captions: [richText('example caption', undefined, undefined)],
          }),
          image(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1200px-Notion-logo.svg.png',
            {
              captions: [richText('image caption', undefined, undefined)],
            },
          ),
        ]),
      ]),
    ],
  });
};

main()
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
