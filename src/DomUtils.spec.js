import * as DomUtils from './DomUtils'

describe('DomUtils :: DomUtils', () => {
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
      DomUtils.mergeNodeAttributes(nodeMock)(['href', 'class'])
    ).toEqual({
      class: 'myclass',
      href: 'test',
    })
  })

  it('identifies a node type', () => {
    const nodeMock = { nodeType: 12 }

    expect(DomUtils.isNodeType(12)(nodeMock)).toBeTruthy()
    expect(DomUtils.isNodeType(4)(nodeMock)).toBeFalsy()
  })

  it('identifies an element node', () => {
    const elementNodeMock = { nodeType: 1 }
    const notElementNodeMock = { nodeType: 3 }

    expect(DomUtils.isElementNode(elementNodeMock)).toBeTruthy()
    expect(DomUtils.isElementNode(notElementNodeMock)).toBeFalsy()
  })

  it('identifies a text node', () => {
    const textNodeMock = { nodeType: 3, wholeText: 'a text' }
    const emptyTextNodeMock = { nodeType: 3, wholeText: '\n' }
    const notTextNodeMock = { nodeType: 1 }

    expect(DomUtils.isTextNode(textNodeMock)).toBeTruthy()
    expect(DomUtils.isTextNode(emptyTextNodeMock)).toBeFalsy()
    expect(DomUtils.isTextNode(notTextNodeMock)).toBeFalsy()
  })

  it('identifies a tag name', () => {
    const nodeMock = { tagName: 'P' }

    expect(DomUtils.hasTagName('P')(nodeMock)).toBeTruthy()
    expect(DomUtils.hasTagName('B')(nodeMock)).toBeFalsy()
  })

  it('determines that a node has some data attributes', () => {
    let hasAttributeCalls = []
    const nodeMock = {
      hasAttribute: attr => {
        hasAttributeCalls.push(attr)
        return true
      },
    }

    expect(DomUtils.hasDataAttribute('src')(nodeMock)).toBeTruthy()
    expect(hasAttributeCalls[0]).toBe('data-src')
  })

  it('identifies that a node has a class', () => {
    const nodeMock = { classList: ['a-class'] }

    expect(DomUtils.hasClass('a-class')(nodeMock)).toBeTruthy()
    expect(DomUtils.hasClass('an-other-class')(nodeMock)).toBeFalsy()
  })
})
