module.exports = {
    async headers() {
      return [
        {
          source: '/posts/:id*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=120, stale-while-revalidate=60',
            },
          ],
        },
      ];
    },
  };
  