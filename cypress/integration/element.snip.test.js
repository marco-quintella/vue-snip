import { getSnipText } from '../../src/element/element.snip'

const getMockState = (element, maxLines = 3, ellipsis = '...') => {
  const elementMap = new WeakMap()
  elementMap.set(element, {
    fullText: element.textContent,
    maxLines: maxLines
  })

  return {
    elementMap,
    options: {
      ellipsis
    }
  }
}

describe('ElementSnipper', () => {
  beforeEach(() => {
    cy.visit('element/snip')
  })

  describe('Complete snipping sequence', () => {
    it('snips on negative max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, -1))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('')
      })
    })

    it('snips on zero max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 0))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('')
      })
    })

    it('snips on 1 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 1))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum...')
      })
    })

    it('snips on 2 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 2))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam ve...')
      })
    })

    it('does not snip on 10 max lines', () => {
      cy.get('p').then(([paragraph]) => {
        const snipText = getSnipText(getMockState(paragraph, 10))

        snipText(paragraph)

        expect(paragraph.innerText).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aut, consectetur earum eius error expedita fuga illum iste iure minima nobis, odio praesentium quae quas ullam veniam, voluptates? Distinctio ex hic maiores obcaecati quibusdam quod repudiandae temporibus. Amet consequatur iste nisi quos! Alias atque beatae consectetur dolor doloremque earum eos expedita fugiat pariatur possimus provident quod quos, repudiandae similique sit unde ut veritatis voluptates voluptatibus voluptatum? Assumenda culpa cum eligendi, eos itaque mollitia nostrum possimus praesentium quod rerum totam.')
      })
    })
  })
})