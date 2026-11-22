import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiStatus from '~/components/ui/UiStatus.vue'

describe('UiStatus', () => {
  it('renders slot with an aria-hidden accent dot', () => {
    const w = mount(UiStatus, { slots: { default: 'v0.1' } })
    expect(w.text()).toBe('v0.1')
    expect(w.classes()).toContain('bg-accent-soft')
    const dot = w.find('[aria-hidden="true"]')
    expect(dot.exists()).toBe(true)
    expect(dot.classes()).toContain('bg-accent')
  })
  it('merges class from outside', () => {
    const w = mount(UiStatus, { attrs: { class: 'ml-auto' }, slots: { default: 'x' } })
    expect(w.classes()).toContain('ml-auto')
    expect(w.classes()).toContain('bg-accent-soft')
  })
})
