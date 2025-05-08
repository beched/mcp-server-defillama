import {
  getProtocolsHandler,
  getProtocolTvlHandler,
  getChainTvlHandler,
  getTokenPricesHandler,
  getHistoricalPricesHandler,
  getStablecoinsHandler,
  getStablecoinDataHandler,
  searchProtocolsHandler
} from "./handlers/defillama.js";

export const tools = [
  // {
  //   name: "defillama_get_protocols",
  //   description: "List all protocols tracked by DefiLlama",
  //   inputSchema: {
  //     type: "object",
  //     properties: {},
  //     required: []
  //   }
  // },
  {
    name: "defillama_search_protocols",
    description: "Search protocols with filtering capabilities. Available fields for filtering and selection: id, name, address, symbol, url, description, chain, logo, audits, audit_note, gecko_id, cmcId, category, chains (array), oracles (array), forkedFrom (array), module, twitter, audit_links (array), parentProtocol, listedAt, methodology, slug, tvl, chainTvls (object), change_1h, change_1d, change_7d, tokenBreakdowns (object), mcap. Numeric fields (tvl, audits, change_1h, change_1d, change_7d) support comparison operators: gt (greater than), gte (greater than or equal), lt (less than), lte (less than or equal)",
    inputSchema: {
      type: "object",
      properties: {
        nameRegex: { 
          type: "string",
          description: "Regular expression to match protocol names"
        },
        filters: {
          type: "object",
          description: "Object containing field-value pairs to filter protocols. For numeric fields (tvl, audits, change_1h, change_1d, change_7d), you can use comparison operators: { field: { gt: value }, { gte: value }, { lt: value }, { lte: value } }. Example: { tvl: { gt: 100000000 }, audits: { gte: 2 } }",
          additionalProperties: {
            oneOf: [
              { type: "string" },
              { type: "number" },
              { type: "boolean" },
              { type: "array" },
              {
                type: "object",
                properties: {
                  gt: { type: "number" },
                  gte: { type: "number" },
                  lt: { type: "number" },
                  lte: { type: "number" }
                },
                additionalProperties: false
              }
            ]
          }
        },
        fields: {
          type: "array",
          items: { type: "string" },
          description: "Fields to include in the response. Available fields: id, name, address, symbol, url, description, chain, logo, audits, audit_note, gecko_id, cmcId, category, chains, oracles, forkedFrom, module, twitter, audit_links, parentProtocol, listedAt, methodology, slug, tvl, chainTvls, change_1h, change_1d, change_7d, tokenBreakdowns, mcap"
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return"
        }
      },
      required: []
    }
  },
  // {
  //   name: "defillama_get_protocol_tvl",
  //   description: "Get TVL data for a specific protocol",
  //   inputSchema: {
  //     type: "object",
  //     properties: {
  //       protocol: { type: "string" }
  //     },
  //     required: ["protocol"]
  //   }
  // },
  {
    name: "defillama_get_chain_tvl",
    description: "Get TVL data for a specific chain",
    inputSchema: {
      type: "object",
      properties: {
        chain: { type: "string" }
      },
      required: ["chain"]
    }
  },
  {
    name: "defillama_get_token_prices",
    description: "Get current prices of tokens",
    inputSchema: {
      type: "object",
      properties: {
        coins: {
          type: "array",
          items: { type: "string" }
        }
      },
      required: ["coins"]
    }
  },
  {
    name: "defillama_get_historical_prices",
    description: "Get historical prices of tokens",
    inputSchema: {
      type: "object",
      properties: {
        coins: {
          type: "array",
          items: { type: "string" }
        },
        timestamp: { type: "number" }
      },
      required: ["coins", "timestamp"]
    }
  },
  {
    name: "defillama_get_stablecoins",
    description: "List all stablecoins tracked by DefiLlama",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "defillama_get_stablecoin_data",
    description: "Get data for a specific stablecoin",
    inputSchema: {
      type: "object",
      properties: {
        asset: { type: "string" }
      },
      required: ["asset"]
    }
  }
];

type handlerDictionary = Record<typeof tools[number]["name"], (input: any) => any>;

export const handlers: handlerDictionary = {
  //"defillama_get_protocols": getProtocolsHandler,
  // "defillama_get_protocol_tvl": getProtocolTvlHandler,
  "defillama_get_chain_tvl": getChainTvlHandler,
  "defillama_get_token_prices": getTokenPricesHandler,
  "defillama_get_historical_prices": getHistoricalPricesHandler,
  "defillama_get_stablecoins": getStablecoinsHandler,
  "defillama_get_stablecoin_data": getStablecoinDataHandler,
  "defillama_search_protocols": searchProtocolsHandler
};
