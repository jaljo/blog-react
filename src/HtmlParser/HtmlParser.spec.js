import * as HtmlParser from './HtmlParser'
import { link } from 'fs';

describe('HtmlParser :: HtmlParser', () => {
  it('merge node attributes in an object', () => {
    const nodeMapNock = {
      href: 'test',
      class: 'myclass',
      id: 'myid',
    }
    const nodeMock = {
      getAttribute: attrName => nodeMapNock[attrName]
    }

    expect(
      HtmlParser.mergeNodeAttributes(nodeMock)(['href', 'class'])
    ).toEqual({
      class: 'myclass',
      href: 'test',
    })
  })

  it('creates a component with the correct type', () => {
    expect(
      HtmlParser.createComponent('@type/TEST')({})
    ).toEqual({
      type: '@type/TEST',
      children: [],
      content: null,
    })
  })

  it('identifies a node type', () => {
    const nodeMock = { nodeType: 12 }

    expect(HtmlParser.isNodeType(12)(nodeMock)).toBeTruthy()
    expect(HtmlParser.isNodeType(4)(nodeMock)).toBeFalsy()
  })

  it('identifies an element node', () => {
    const elementNodeMock = { nodeType: 1 }
    const notElementNodeMock = { nodeType: 3 }

    expect(HtmlParser.isElementNode(elementNodeMock)).toBeTruthy()
    expect(HtmlParser.isElementNode(notElementNodeMock)).toBeFalsy()
  })

  it('determines if a text is empty', () => {
    expect(HtmlParser.isNotWhiteCharacter('\n')).toBeFalsy()
    expect(HtmlParser.isNotWhiteCharacter('a')).toBeTruthy()
  })

  it('identifies a text node', () => {
    const textNodeMock = { nodeType: 3, wholeText: 'a text' }
    const emptyTextNodeMock = { nodeType: 3, wholeText: '\n' }
    const notTextNodeMock = { nodeType: 1 }

    expect(HtmlParser.isTextNode(textNodeMock)).toBeTruthy()
    expect(HtmlParser.isTextNode(emptyTextNodeMock)).toBeFalsy()
    expect(HtmlParser.isTextNode(notTextNodeMock)).toBeFalsy()
  })

  it('identifies a tag name', () => {
    const nodeMock = { tagName: 'P' }

    expect(HtmlParser.hasTagName('P')(nodeMock)).toBeTruthy()
    expect(HtmlParser.hasTagName('B')(nodeMock)).toBeFalsy()
  })

  it('identifies a paragraph node', () => {
    const paragraphNodeMock = { nodeType: 1, tagName: 'P' }
    const notParagraphNodeMock = { nodeType: 1, tagName: 'B' }

    expect(HtmlParser.isParagraph(paragraphNodeMock)).toBeTruthy()
    expect(HtmlParser.isParagraph(notParagraphNodeMock)).toBeFalsy()
  })

  it('identifies a bold node', () => {
    const boldNodeMock = { nodeType: 1, tagName: 'B' }
    const notBoldNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isBold(boldNodeMock)).toBeTruthy()
    expect(HtmlParser.isBold(notBoldNodeMock)).toBeFalsy()
  })

  it('identifies a link node', () => {
    const linkNodeMock = { nodeType: 1, tagName: 'A' }
    const notLinkNodeMock = { nodeType: 1, tagName: 'P' }

    expect(HtmlParser.isLink(linkNodeMock)).toBeTruthy()
    expect(HtmlParser.isLink(notLinkNodeMock)).toBeFalsy()
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
