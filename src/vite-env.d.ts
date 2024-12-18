/// <reference types="vite/client" />
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BACKEND_REACT_APP_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }