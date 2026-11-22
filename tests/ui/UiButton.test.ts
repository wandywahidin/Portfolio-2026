import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiButton from '~/components/ui/UiButton.vue'

describe('UiButton', () => {
  it('renders a primary button[type=button] by default', () => {
    const w = mount(UiButton, { slots: { default: 'Kirim' } })
    const el = w.find('button')
    expect(el.exists()).toBe(true)
    expect(el.attributes('type')).toBe('button')
    expect(el.classes()).toContain('bg-ink')
    expect(el.text()).toBe('Kirim')
  })

  it('secondary variant uses surface background and line border', () => {
    const w = mount(UiButton, { props: { variant: 'secondary' }, slots: { default: 'x' } })
    const el = w.find('button')
    expect(el.classes()).toContain('bg-surface')
    expect(el.classes()).toContain('border-line')
    expect(el.classes()).not.toContain('bg-ink')
  })

  it('renders an internal <a> without target when only href is given', () => {
    const w = mount(UiButton, { props: { href: '#proyek' }, slots: { default: 'Lihat proyek' } })
    const a = w.find('a')
    expect(a.exists()).toBe(true)
    expect(a.attributes('href')).toBe('#proyek')
    expect(a.attributes('target')).toBeUndefined()
    expect(w.find('button').exists()).toBe(false)
  })

  it('external link opens in new tab with rel and an aria-hidden arrow', () => {
    const w = mount(UiButton, {
      props: { href: 'https://example.com', external: true },
      slots: { default: 'LinkedIn' },
    })
    const a = w.find('a')
    expect(a.attributes('target')).toBe('_blank')
    expect(a.attributes('rel')).toBe('noopener noreferrer')
    const arrow = a.find('[aria-hidden="true"]')
    expect(arrow.exists()).toBe(true)
    expect(arrow.text()).toContain('↗')
  })

  it('merges class passed from outside', () => {
    const w = mount(UiButton, { attrs: { class: 'w-full' }, slots: { default: 'x' } })
    expect(w.find('button').classes()).toContain('w-full')
    expect(w.find('button').classes()).toContain('bg-ink')
  })
})
