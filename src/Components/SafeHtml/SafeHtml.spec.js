import * as SafeHtml from './SafeHtml'
import renderer from 'react-test-renderer'
import { createTestStore, createContainer } from './../../TestUtils'

describe('Components :: SafeHtml', () => {
  it('renders a paragraph component', () => {
    const tree = renderer.create(
      SafeHtml.Paragraph({ children: [
        { type: '@type/TEXT', content: 'hi there :)' }
      ]})
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders bold component', () => {
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

  it('renders a link component', () => {
    const tree = renderer.create(
      SafeHtml.Link({
        href: 'test link',
        children: [{ type: '@type/TEXT', content: 'a link text' }]
      })
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders an italic component', () => {
    const tree = renderer.create(
      SafeHtml.Italic({
        children: [{ type: '@type/TEXT', content: 'an italic text' }]
      })
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders a blockquote component', () => {
    const tree = renderer.create(
      SafeHtml.Blockquote({
        children: [{ type: '@type/TEXT', content: 'a quoted text' }]
      })
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders a gist component', () => {
    const store = createTestStore()

    expect(createContainer(
      SafeHtml.Gist({
        'data-src': 'https://gist.github.com/jaljo/86954a679fcaed5e960f687ead25c4aa.js'
      }),
      store,
    )).toMatchSnapshot()

  })

  it('renders an inline code component', () => {
    const tree = renderer.create(
      SafeHtml.InlineCode({
        children: [{ type: '@type/TEXT', content: 'a piece of code' }]
      })
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders a list component with items', () => {
    const tree = renderer.create(
      SafeHtml.List({
        children: [
          {
            type: '@type/LIST_ITEM',
            children: [{ type: '@type/TEXT', content: 'pin one' }]
          },
          {
            type: '@type/LIST_ITEM',
            children: [{ type: '@type/TEXT', content: 'pin two' }]
          },
          {
            type: '@type/LIST_ITEM',
            children: [{ type: '@type/TEXT', content: 'pin three' }]
          }
        ]
      })
    )

    expect(tree).toMatchSnapshot()
  })


  it('renders a figure component', () => {
    const tree = renderer.create(
      SafeHtml.Figure({
        image: 'https://www.an-image.com/test.jpg',
        caption: 'this is the caption of the image',
      })
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
        {
          type: '@type/LINK',
          children: [
            {
              type: '@type/TEXT',
              content: 'a link text child'
            },
          ],
          href: 'http://jlanglois.fr',
        },
        {
          type: '@type/ITALIC',
          children: [
            {
              type: '@type/TEXT',
              content: 'an italic text'
            },
          ],
        },
      ]
    }

    const tree = renderer.create(
      SafeHtml.default(componentTreeMock)
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders a nested list with formatting components', () => {
    const tree = renderer.create(
      SafeHtml.List({
        children: [
          {
            type: '@type/LIST_ITEM',
            children: [
              {
                type: '@type/TEXT',
                content: 'pin one'
              },
              {
                type: '@type/ITALIC',
                children: [
                  {
                    type: '@type/TEXT',
                    content: 'with some italic text'
                  },
                ],
              },
              {
                type: '@type/TEXT',
                content: 'in it.'
              },
            ]
          },
        ]
      })
    )

    expect(tree).toMatchSnapshot()
  })
})
