import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHero from '~/components/site/SiteHero.vue'
import SiteNav from '~/components/site/SiteNav.vue'
import SpecSheet from '~/components/site/SpecSheet.vue'
import AboutSection from '~/components/site/AboutSection.vue'
import ContactSection from '~/components/site/ContactSection.vue'

const PHONE = /(\+62|08)\d{6,}/

describe('SiteHero', () => {
  it('renders the exact h1, a paragraph with "5 tahun" and an external LinkedIn link', async () => {
    const w = await mountSuspended(SiteHero, { props: { showProjectsCta: true } })
    expect(w.find('h1').text()).toBe('Antarmuka yang andal untuk produk keuangan.')
    expect(w.find('p').exists()).toBe(true)
    expect(w.findAll('p').some(p => p.text().includes('5 tahun'))).toBe(true)
    const li = w.findAll('a').find(a => a.text().includes('LinkedIn'))!
    expect(li.attributes('href')).toBe(useAppConfig().site.linkedin)
    expect(li.attributes('target')).toBe('_blank')
    expect(li.attributes('rel')).toBe('noopener noreferrer')
    expect(w.text()).toContain('Lihat proyek')
  })

  it('hides "Lihat proyek" when showProjectsCta is false', async () => {
    const w = await mountSuspended(SiteHero, { props: { showProjectsCta: false } })
    expect(w.text()).not.toContain('Lihat proyek')
    expect(w.find('a[href="#proyek"]').exists()).toBe(false)
  })
})

describe('SiteNav', () => {
  it('shows Proyek link only when showProjectsLink is true', async () => {
    const on = await mountSuspended(SiteNav, { props: { showProjectsLink: true } })
    expect(on.find('a[href="/#proyek"]').exists()).toBe(true)
    const off = await mountSuspended(SiteNav, { props: { showProjectsLink: false } })
    expect(off.find('a[href="/#proyek"]').exists()).toBe(false)
    expect(off.text()).toContain('Tentang')
  })
})

describe('SiteNav CV button', () => {
  afterEach(() => {
    useAppConfig().site.cvPath = ''
  })
  it('is hidden while no CV file is configured', async () => {
    useAppConfig().site.cvPath = ''
    const w = await mountSuspended(SiteNav, { props: { showProjectsLink: false } })
    expect(w.text()).not.toContain('Unduh CV')
    expect(w.find('a[href=""]').exists()).toBe(false)
  })
  it('links to the CV when configured', async () => {
    useAppConfig().site.cvPath = '/cv-wandy-wahidin.pdf'
    const w = await mountSuspended(SiteNav, { props: { showProjectsLink: false } })
    expect(w.find('a[href="/cv-wandy-wahidin.pdf"]').text()).toContain('Unduh CV')
  })
})

describe('app config default', () => {
  it('ships without a CV link until public/cv-wandy-wahidin.pdf exists', async () => {
    const { existsSync } = await import('node:fs')
    const { resolve } = await import('node:path')
    const hasPdf = existsSync(resolve(__dirname, '../../public/cv-wandy-wahidin.pdf'))
    const { readFileSync } = await import('node:fs')
    const src = readFileSync(resolve(__dirname, '../../app/app.config.ts'), 'utf8')
    if (!hasPdf) expect(src).toMatch(/cvPath:\s*''/)
  })
})

describe('SpecSheet', () => {
  it('renders profile.json and four rows', async () => {
    const w = await mountSuspended(SpecSheet)
    expect(w.text()).toContain('profile.json')
    const rows = w.findAll('[data-test=spec-row]').map(r => [
      r.find('dt').text(),
      r.find('dd').text(),
    ])
    expect(rows).toEqual([
      ['Stack', 'Vue.js · Nuxt.js · Tailwind CSS'],
      ['Domain', 'Merchant & pembayaran'],
      ['Keamanan', 'DevSecOps · Secure Coding'],
      ['Sedang dibangun', '@wandy/ui v0.1'],
    ])
  })
})

describe('AboutSection', () => {
  it('renders five stack tags and both certifications', async () => {
    const w = await mountSuspended(AboutSection)
    const tags = w.findAll('[data-test=stack] li').map(t => t.text())
    expect(tags).toEqual(['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'React.js', 'Pinia'])
    const certs = w.findAll('[data-test=cert]').map(c => c.text())
    expect(certs[0]).toContain('DevSecOps Technical Excellence')
    expect(certs[0]).toContain('NaradaCode · 2023')
    expect(certs[1]).toContain('Secure Coding Training')
    expect(certs[1]).toContain('ITSEC Asia · 2025')
  })
})

describe('ContactSection', () => {
  let original: Record<string, string> = {}
  beforeEach(() => {
    original = { ...useAppConfig().site }
  })
  afterEach(() => Object.assign(useAppConfig().site, original))
  const cfg = { get site() { return useAppConfig().site } }

  it('has a mailto link and no phone number', async () => {
    const w = await mountSuspended(ContactSection)
    expect(w.find('a[href="mailto:wandywahidin53@gmail.com"]').exists()).toBe(true)
    expect(w.html()).not.toMatch(PHONE)
  })

  it('omits GitHub and npm links when empty', async () => {
    cfg.site.github = ''
    cfg.site.npm = ''
    const w = await mountSuspended(ContactSection)
    expect(w.findAll('a').some(a => a.text().includes('GitHub'))).toBe(false)
    expect(w.findAll('a').some(a => a.text().trim().startsWith('npm'))).toBe(false)
    expect(w.find('a[href=""]').exists()).toBe(false)
  })

  it('renders GitHub link when configured', async () => {
    cfg.site.github = 'https://github.com/example'
    const w = await mountSuspended(ContactSection)
    const gh = w.findAll('a').find(a => a.text().includes('GitHub'))
    expect(gh?.attributes('href')).toBe('https://github.com/example')
  })
})

describe('no BRI mention', () => {
  it('none of the static sections contain "BRI"', async () => {
    const parts = await Promise.all([
      mountSuspended(SiteNav, { props: { showProjectsLink: true } }),
      mountSuspended(SiteHero, { props: { showProjectsCta: true } }),
      mountSuspended(SpecSheet),
      mountSuspended(AboutSection),
      mountSuspended(ContactSection),
    ])
    const html = parts.map(p => p.html()).join('\n')
    expect(html).not.toContain('BRI')
    expect(html).not.toMatch(PHONE)
  })
})
