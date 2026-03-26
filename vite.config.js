import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const isCI = !!(process.env.VERCEL || process.env.CI || process.env.NETLIFY)

const CJK_RANGE = /[\u4e00-\u9fff\u3400-\u4dbf\uff00-\uffef]/
const originalLog = console.log
console.log = (...args) => {
  const msg = args.join(' ')
  if (CJK_RANGE.test(msg)) return
  originalLog(...args)
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const plugins = [react()]

  if (!isCI) {
    const { default: seoPrerender } = await import('vite-plugin-seo-prerender')
    plugins.push(
      seoPrerender({
        routes: [
          '/',
          '/colleges',
          '/colleges/engineering',
          '/study-abroad',
          '/services',
          '/entrance-exams',
          '/gallery',
          '/about-us',
          '/contact-us',
        ],
        delay: 3000,
        removeStyle: true,
      })
    )
  }

  return {
    plugins,
    define: {
      'import.meta.env.VITE_FORMSPREE_COUNSELLING_URL': JSON.stringify(env.VITE_FORMSPREE_COUNSELLING_URL || process.env.VITE_FORMSPREE_COUNSELLING_URL || ''),
    },
    server: {
      port: 3000,
      open: true
    }
  }
})
