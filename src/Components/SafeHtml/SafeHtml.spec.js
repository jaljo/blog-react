import * as SafeHtml from './SafeHtml'
import renderer from 'react-test-renderer';

describe('Components :: SafeHtml', () => {
  it('renders a paragraph component', () => {
    const tree = renderer.create(
      SafeHtml.Paragraph({ children: [
        { type: '@type/TEXT', content: 'hi there :)' }
      ]})
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders bold componet', () => {
    const tree = renderer.create(
      SafeHtml.Bold({ children: [
        { type: '@type/TEXT', content: 'a bold text' }
      ]})
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders a text component', () => {
    const tree = renderer.create(
      SafeHtml.Text({ content: 'a simple text' })
    )

    expect(tree).toMatchSnapshot()
  })

  it('identifies a component type', () => {
    const componentMock = { type: 'test' }

    expect(SafeHtml.is('test')(componentMock)).toBeTruthy()
    expect(SafeHtml.is('noop')(componentMock)).toBeFalsy()
  })

  it('renders a component tree to HTML', () => {
    const componentTreeMock = {
      type: '@type/PARAGRAPH',
      children: [
        {
          type: '@type/BOLD',
          children: [
            {
              type: '@type/TEXT',
              content: 'a test text'
            },
            {
              type: '@type/TEXT',
              content: 'another text'
            }
          ]
        },
      ]
    }

    const tree = renderer.create(
      SafeHtml.default(componentTreeMock)
    )

    expect(tree).toMatchSnapshot()
  })
})
