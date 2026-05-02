/**
 * Tax Escape - RapidAPI Endpoint
 * Cloudflare Worker implementation for "Korean Tax Summary API"
 */

const { TAX_DATA_CONTENT } = require('./data.js');

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    // CORS Headers
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (url.pathname === '/tax-tags') {
      if (!query) {
        return new Response(JSON.stringify({
          status: "error",
          message: "Query parameter is required."
        }), { status: 400, headers });
      }

      const results = TAX_DATA_CONTENT.filter(item => 
        item.title.includes(query) || 
        item.tags.some(tag => tag.includes(query))
      ).map(item => ({
        name: item.title,
        category: item.category,
        tags: item.tags,
        id: item.id
      }));

      return new Response(JSON.stringify({
        status: "success",
        count: results.length,
        results: results
      }), { status: 200, headers });
    }

    // Health check or documentation
    return new Response(JSON.stringify({
      name: "Tax Escape API",
      version: "1.0.0",
      endpoints: ["/tax-tags?query={keyword}"]
    }), { status: 200, headers });
  },
};
