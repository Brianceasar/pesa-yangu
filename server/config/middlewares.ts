export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'frame-ancestors': ['*'], // ⚠️ For development only — use a proper domain in production
          'frame-src': ['*'],
          'media-src': ['*'],
          'default-src': ["'self'", 'data:', 'blob:', 'http://localhost:1337'],
          'connect-src': ["'self'", 'http://localhost:1337'],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
