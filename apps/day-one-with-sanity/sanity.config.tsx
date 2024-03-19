import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {media} from 'sanity-plugin-media'

const Logo = () => (
  <svg
    width="332"
    height="332"
    viewBox="0 0 332 332"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M250.67 96.3841C253.794 93.26 258.86 93.26 261.984 96.3841L325.943 160.343C329.067 163.467 329.067 168.533 325.943 171.657L261.984 235.616C258.86 238.74 253.794 238.74 250.67 235.616L186.711 171.657C183.587 168.533 183.587 163.467 186.711 160.343L250.67 96.3841Z"
      fill="#1E98F5"
    />
    <rect
      x="166"
      y="181.054"
      width="106.452"
      height="106.452"
      rx="8"
      transform="rotate(45 166 181.054)"
      fill="#68707C"
    />
    <rect
      x="75.6729"
      y="90.7273"
      width="106.452"
      height="106.452"
      rx="8"
      transform="rotate(45 75.6729 90.7273)"
      fill="#E5AA20"
    />
    <rect
      x="166"
      y="0.400146"
      width="106.452"
      height="106.452"
      rx="8"
      transform="rotate(45 166 0.400146)"
      fill="#F45F63"
    />
  </svg>
)

export default defineConfig({
  name: 'default',
  title: 'Storefront',
  icon: Logo,
  projectId: 'voz7kdob',
  dataset: 'production',

  plugins: [
    structureTool({
      name: 'content',
      structure: (S) => structure(S),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
