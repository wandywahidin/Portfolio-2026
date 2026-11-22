import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiCard from '~/components/ui/UiCard.vue'

describe('UiCard', () => {
  it('renders a div by default with surface, line border and 12px radius', () => {
    const w = mount(UiCard, { slots: { default: 'isi' } })
    expect(w.element.tagName).toBe('DIV')
    expect(w.classes()).toEqual(expect.arrayContaining(['bg-surface', 'border-line', 'rounded-[12px]']))
    expect(w.text()).toBe('isi')
  })
  it('renders the element given in `as`', () => {
    const w = mount(UiCard, { props: { as: 'article' }, slots: { default: 'x' } })
    expect(w.element.tagName).toBe('ARTICLE')
  })
  it('merges class from outside', () => {
    const w = mount(UiCard, { attrs: { class: 'p-8' }, slots: { default: 'x' } })
    expect(w.classes()).toContain('p-8')
  })
})
