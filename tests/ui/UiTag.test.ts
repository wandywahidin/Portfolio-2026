import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTag from '~/components/ui/UiTag.vue'

describe('UiTag', () => {
  it('renders slot content', () => {
    const w = mount(UiTag, { slots: { default: 'Vue 3' } })
    expect(w.text()).toBe('Vue 3')
    expect(w.classes()).toContain('font-mono')
    expect(w.classes()).toContain('border-line')
  })
  it('merges class from outside', () => {
    const w = mount(UiTag, { attrs: { class: 'mt-2' }, slots: { default: 'x' } })
    expect(w.classes()).toContain('mt-2')
    expect(w.classes()).toContain('font-mono')
  })
})
