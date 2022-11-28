notion-sdk-js-helper [![npm version](https://badge.fury.io/js/@sota1235%2Fnotion-sdk-js-helper.svg)](https://badge.fury.io/js/@sota1235%2Fnotion-sdk-js-helper)
====

Helper for [makenotion/notion-sdk-js](https://github.com/makenotion/notion-sdk-js).

### Feature

- Type safe helper to build JSON of [blocks](https://developers.notion.com/reference/block).

You can see example codes on [this page](https://sota1235.notion.site/Example-page-for-notion-sdk-js-helper-4176d72d760c40979a6a6523fa2c1165).

### Requirement

- See [.node-version](./.node-version).

### Usage

Without this library, when you want to create new page.

```typescript
import { Client } from '@notionhq/client';

const client = new Client({
  auth: 'YOUR_NOTION_API_TOKEN',
});

await client.pages.create({
  parent: {
    databse_id: 'DATABASE_ID',
  },
  properties: {},
  children: [
    {
      type: 'heading_1',
      heading_1: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Section1',
            },
          },
        ],
      },
    },
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'I am ',
            },
          },
          {
            type: 'text',
            text: {
              content: 'engineer',
            },
            annotations: {
              bold: true,
            },
          },
        ],
      },
    },
  ],
});
```

With this library.

```typescript
import { BlockObjects, RichTextObjects, CustomTypes } from '@sota1235/notion-sdk-js-helper';
import { Client } from '@notionhq/client';

const {
  heading1,
  paragraph,
} = BlockObjects;

const client = new Client({
  auth: 'YOUR_NOTION_API_TOKEN',
});

// Use helper methods when create page
await client.pages.create({
  parent: {
    databse_id: 'DATABASE_ID',
  },
  properties: {},
  children: [
    heading1('Section 1'),
    paragraph([
      RichTextObjects.richText('I am '),
      RichTextObjects.richText('engineer', {
        bold: true,
      }),
    ]),
  ],
});
```

You can also use this library when fetching data.

```typescript
// Use custom types as you like when fetching data
const { results } = await client.blocks.children.list({
  block_id: 'PAGE_ID',
});
const heading1Data = results[0].heading_1 as CustomTypes.NotionBlock<'heading_1'>['heading_1'];
```

### Install

```
npm i -S @sota1235/notion-sdk-js-helper@latest
```

### Licence

This software is released under the MIT License, see LICENSE.txt.

## Author

[@sota1235](https://github.com/sota1235)
