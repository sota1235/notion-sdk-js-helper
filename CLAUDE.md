# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@sota1235/notion-sdk-js-helper`, a TypeScript library that provides type-safe helper utilities for building JSON objects compatible with the Notion API's block system. The library simplifies creating Notion pages programmatically by replacing verbose JSON structures with intuitive function-based APIs.

## Common Development Commands

### Build & Development
```bash
npm run build          # Compile TypeScript
npm run build:publish  # Build for npm publishing  
npm run watch          # Watch mode compilation
npm run debug:createPage # Run comprehensive example
```

### Testing
```bash
npm test              # Run all tests
npm run test:ci       # Run tests with coverage (CI)
```

### Code Quality
```bash
npm run lint          # Run Biome linter
npm run fix           # Auto-fix linting issues
```

## Code Architecture

### Core Modules (exported from src/index.ts)

**BlockObjects** (`src/blockObjects.ts`): 
- 25+ functions for creating Notion blocks (paragraph, heading1-3, callout, quote, lists, etc.)
- Main pattern: `functionName(content, options?) -> NotionBlockObject`
- Example: `heading1('Title')` replaces complex JSON structure

**RichTextObjects** (`src/richTextObject.ts`):
- Functions for creating formatted text with annotations
- Supports bold, italic, colors, links, and combinations
- Pattern: `richText(content, annotations?)`

**CustomTypes** (`src/customTypes.ts`):
- TypeScript definitions extracted from Notion API types
- Provides type safety for all block operations

**TypeValidation** (`src/typeValidation.ts`):
- Runtime type checking utilities for Notion API responses

**ResponseProperty** (`src/responseProperty.ts`):
- Utilities for working with page property responses from Notion API

### Key Implementation Details

- **Type Safety**: Full TypeScript support with strict settings enabled
- **Module System**: ES modules (`"type": "module"`)
- **Peer Dependency**: Requires `@notionhq/client: 5.x`
- **Testing**: Jest with snapshot testing for block object validation
- **Code Quality**: Biome for linting/formatting, Husky for git hooks

### Development Patterns

- Tests are co-located with source files in `/src`
- Comprehensive example in `src/example/createPage.ts` (304 lines) demonstrates all block types
- Snapshot tests ensure block structure consistency
- Functions follow pattern: simple content string + optional configuration object

### Build Configuration

- Two TypeScript configs: `tsconfig.json` (development) and `tsconfig.publish.json` (distribution)
- Output target: ESNEXT with NodeNext module resolution
- Node version: 22.20.0 (specified in `.node-version`)
- Distribution files: `.js` and `.d.ts` files in `/dist`