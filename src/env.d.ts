/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  // more env variables...
}

interface Window {
  gtag?: (...args: unknown[]) => void
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
