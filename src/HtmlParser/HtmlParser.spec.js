import * as HtmlParser from './HtmlParser'
import { T, F } from 'ramda'

describe('HtmlParser :: HtmlParser', () => {
  it('creates a component with the correct type', () => {
    expect(
      HtmlParser.createComponent('@type/TEST')({})
    ).toEqual({
      type: '@type/TEST',
      children: [],
      content: null,
    })
  })

  it('identifies a paragraph node', () => {
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }
    const notParagraphNodeMock = { nodeType: 1, tagName: 'B' }

    expect(HtmlParser.isParagraph(paragraphNodeMock)).toBeTruthy()
    expect(HtmlParser.isParagraph(notParagraphNodeMock)).toBeFalsy()
  })

  it('creates a paragraph component', () => {
    const paragraphNodeMock = {
      nodeType: 1,
      tagName: 'P',
      childNodes: [
        {
          nodeType: 3,
          wholeText: 'paragraph text child'
        }
      ]
    }

    expect(HtmlParser.createParagraph(paragraphNodeMock)).toEqual({
      type: '@type/PARAGRAPH',
      children: [
        {
          type: '@type/TEXT',
          children: [],
          content: 'paragraph text child',
        }
      ],
      content: null,
    })
  })

  it('identifies a bold node', () => {
    const boldNodeMock = { nodeType: 1, tagName: 'B' }
    const notBoldNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isBold(boldNodeMock)).toBeTruthy()
    expect(HtmlParser.isBold(notBoldNodeMock)).toBeFalsy()
  })

  it('creates a bold component', () => {
    const boldNodeMock = {
      nodeType: 1,
      tagName: 'B',
      childNodes: [
        {
          nodeType: 3,
          wholeText: 'bold text child'
        }
      ],
    }

    expect(HtmlParser.createBold(boldNodeMock)).toEqual({
      type: '@type/BOLD',
      children: [
        {
          type: '@type/TEXT',
          children: [],
          content: 'bold text child',
        }
      ],
      content: null,
    })
  })

  it('creates a text component', () => {
    const textMock = { nodeType: 3, wholeText: 'a text to test' }

    expect(HtmlParser.createText(textMock)).toEqual({
      type: '@type/TEXT',
      children: [],
      content: 'a text to test',
    })
  })

  it('identifies a link node', () => {
    const linkNodeMock = { nodeType: 1, tagName: 'A' }
    const notLinkNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isLink(linkNodeMock)).toBeTruthy()
    expect(HtmlParser.isLink(notLinkNodeMock)).toBeFalsy()
  })

  it('creates a link component', () => {
    const linkMock = {
      nodeType: 1,
      getAttribute: () => 'jlanglois.fr',
      childNodes: [
        {
          nodeType: 3,
          wholeText: 'a link text child'
        }
      ],
    }

    expect(
      HtmlParser.createLink(linkMock)
    ).toEqual({
      type: '@type/LINK',
      children: [
        {
          type: '@type/TEXT',
          children: [],
          content: 'a link text child',
        }
      ],
      content: null,
      href: 'jlanglois.fr',
    })
  })

  it('identifies an italic node', () => {
    const italicNodeMock = { nodeType: 1, tagName: 'I' }
    const notItalicNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isItalic(italicNodeMock)).toBeTruthy()
    expect(HtmlParser.isItalic(notItalicNodeMock)).toBeFalsy()
  })

  it('creates an italic component', () => {
    const italicMock = {
      nodeType: 1,
      childNodes: [
        {
          nodeType: 3,
          wholeText: 'an italic text'
        }
      ],
    }

    expect(
      HtmlParser.createItalic(italicMock)
    ).toEqual({
      type: '@type/ITALIC',
      children: [
        {
          type: '@type/TEXT',
          children: [],
          content: 'an italic text',
        }
      ],
      content: null,
    })
  })

  it('identifies a blockquote node', () => {
    const blockquoteNodeMock = { nodeType: 1, tagName: 'BLOCKQUOTE' }
    const notBlockquoteNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isBlockquote(blockquoteNodeMock)).toBeTruthy()
    expect(HtmlParser.isBlockquote(notBlockquoteNodeMock)).toBeFalsy()
  })

  it('creates a blockquote component', () => {
    const blockquoteMock = {
      nodeType: 1,
      childNodes: [
        {
          nodeType: 3,
          wholeText: 'a blockquote text'
        }
      ],
    }

    expect(
      HtmlParser.createBlockquote(blockquoteMock)
    ).toEqual({
      type: '@type/BLOCKQUOTE',
      children: [
        {
          type: '@type/TEXT',
          children: [],
          content: 'a blockquote text',
        }
      ],
      content: null,
    })
  })

  it('identifies an inline code node', () => {
    const inlineCodeNodeMock = { nodeType: 1, tagName: 'SPAN', classList: ['code'] }
    const notInlineCodeNodeMock = { nodeType: 1, tagName: 'SPAN', classList: ['noop'] }
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isInlineCode(inlineCodeNodeMock)).toBeTruthy()
    expect(HtmlParser.isInlineCode(notInlineCodeNodeMock)).toBeFalsy()
    expect(HtmlParser.isInlineCode(paragraphNodeMock)).toBeFalsy()
  })

  it('creates an inline code component', () => {
    const inlineCodeMock = {
      nodeType: 1,
      childNodes: [
        {
          nodeType: 3,
          wholeText: 'an inline piece of code'
        }
      ],
    }

    expect(
      HtmlParser.createInlineCode(inlineCodeMock)
    ).toEqual({
      type: '@type/INLINE_CODE',
      children: [
        {
          type: '@type/TEXT',
          children: [],
          content: 'an inline piece of code',
        }
      ],
      content: null,
    })
  })

  it('identifies a git gist node', () => {
    const gistNodeMock = { nodeType: 1, tagName: 'DIV', hasAttribute: T }
    const notGistNodeMock = { nodeType: 1, tagName: 'DIV', hasAttribute: F }
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isGist(gistNodeMock)).toBeTruthy()
    expect(HtmlParser.isGist(notGistNodeMock)).toBeFalsy()
    expect(HtmlParser.isGist(paragraphNodeMock)).toBeFalsy()
  })

  it('creates a git gist component', () => {
    const gistMock = {
      nodeType: 1,
      getAttribute: () => 'a gist url',
    }

    expect(
      HtmlParser.createGist(gistMock)
    ).toEqual({
      type: '@type/GIT_GIST',
      children: [],
      content: null,
      'data-src': 'a gist url',
    })
  })

  it('identifies a list node', () => {
    const listNodeMock = { nodeType: 1, tagName: 'UL' }
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isList(listNodeMock)).toBeTruthy()
    expect(HtmlParser.isList(paragraphNodeMock)).toBeFalsy()
  })

  it('identifies a list item node', () => {
    const listItemNodeMock = { nodeType: 1, tagName: 'LI' }
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isListItem(listItemNodeMock)).toBeTruthy()
    expect(HtmlParser.isListItem(paragraphNodeMock)).toBeFalsy()
  })

  it('creates a list component with items', () => {
    const listMock = {
      nodeType: 1,
      childNodes: [
        {
          nodeType: 1,
          tagName: 'LI',
          childNodes: [],
        }
      ],
    }

    expect(
      HtmlParser.createList(listMock)
    ).toEqual({
      type: '@type/LIST',
      children: [
        {
          type: '@type/LIST_ITEM',
          children: [],
          content: null,
        }
      ],
      content: null,
    })
  })

  it('identifies a figure node', () => {
    const figureNodeMock = { nodeType: 1, tagName: 'FIGURE' }
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isFigure(figureNodeMock)).toBeTruthy()
    expect(HtmlParser.isFigure(paragraphNodeMock)).toBeFalsy()
  })

  it('creates a figure component', () => {
    const figureMock = {
      nodeType: 1,
      querySelector: () => ({
        getAttribute: () => 'an image source',
        innerText: 'an image caption',
      })
    }

    expect(
      HtmlParser.createFigure(figureMock)
    ).toEqual({
      type: '@type/FIGURE',
      image: 'an image source',
      caption: 'an image caption',
    })
  })

  it('identifies a title node', () => {
    const titleNodeMock = { nodeType: 1, tagName: 'H2' }
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isTitle(titleNodeMock)).toBeTruthy()
    expect(HtmlParser.isTitle(paragraphNodeMock)).toBeFalsy()
  })

  it('creates a title component', () => {
    const titleMock = {
      nodeType: 1,
      childNodes: [
        {
          nodeType: 3,
          wholeText: 'My title'
        }
      ],
    }

    expect(
      HtmlParser.createTitle(titleMock)
    ).toEqual({
      type: '@type/TITLE',
      children: [
        {
          type: '@type/TEXT',
          children: [],
          content: 'My title',
        }
      ],
      content: null,
    })
  })

  it('parses a complete HTML tree and creates corrects components', () => {
    const documentMock = {
      createElement: () => ({
        childNodes: [
          {
            nodeType: 1,
            tagName: 'P',
            childNodes: [
              {
                nodeType: 3,
                wholeText: 'a regular text'
              },
              // this is a white text, it should be removed from the final tree
              {
                nodeType: 3,
                wholeText: '\n'
              },
              {
                nodeType: 1,
                tagName: 'B',
                childNodes: [
                  {
                    nodeType: 3,
                    wholeText: 'a boldified text'
                  },
                ],
              },
            ],
          },
        ],
      })
    }

    expect(
      HtmlParser.default(documentMock)('')
    ).toEqual([
      {
        type: '@type/PARAGRAPH',
        children: [
          {
            type: '@type/TEXT',
            children: [],
            content: 'a regular text',
          },
          {
            type: '@type/BOLD',
            children: [
              {
                type: '@type/TEXT',
                children: [],
                content: 'a boldified text',
              },
            ],
            content: null,
          }
        ],
        content: null,
      }
    ])
  })
})
