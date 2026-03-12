export const ContentSecurityPolicy = `
  default-src 'self';
  connect-src 'self'
    https://dev.concero.io
    https://api.v2.concero.io;
  script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval';
  frame-src *;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  worker-src 'self' blob:;
  img-src * data:;
  object-src 'none';
`
  .replace(/\s{2,}/g, ' ')
  .trim()

export const StrictTransportSecurity = 'max-age=31536000; includeSubDomains'