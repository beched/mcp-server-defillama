import { ToolResultSchema } from "../types.js";
import { createErrorResponse, createSuccessResponse } from "./utils.js";
import {
  GetProtocolsInput,
  GetProtocolTvlInput,
  GetChainTvlInput,
  GetTokenPricesInput,
  GetHistoricalPricesInput,
  GetStablecoinsInput,
  GetStablecoinDataInput,
  SearchProtocolsInput
} from "./defillama.types.js";
import { getDefiLlamaClient } from "../clients/defillama.factory.js";

// Get the appropriate client (real or mock) based on TEST_MODE
const defiLlamaClient = getDefiLlamaClient();

export const getProtocolsHandler = async (input: GetProtocolsInput): Promise<ToolResultSchema> => {
  try {
    const protocolsData = await defiLlamaClient.getProtocols();
    return createSuccessResponse(`Protocols: ${JSON.stringify(protocolsData, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting protocols: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getProtocolTvlHandler = async (input: GetProtocolTvlInput): Promise<ToolResultSchema> => {
  try {
    const protocolData = await defiLlamaClient.getProtocolTvl(input.protocol);
    return createSuccessResponse(`Protocol TVL: ${JSON.stringify(protocolData, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting protocol TVL: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getChainTvlHandler = async (input: GetChainTvlInput): Promise<ToolResultSchema> => {
  try {
    const chainData = await defiLlamaClient.getChainTvl(input.chain);
    return createSuccessResponse(`Chain TVL: ${JSON.stringify(chainData, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting chain TVL: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getTokenPricesHandler = async (input: GetTokenPricesInput): Promise<ToolResultSchema> => {
  try {
    const pricesData = await defiLlamaClient.getTokenPrices(input.coins);
    return createSuccessResponse(`Token prices: ${JSON.stringify(pricesData, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting token prices: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getHistoricalPricesHandler = async (input: GetHistoricalPricesInput): Promise<ToolResultSchema> => {
  try {
    const historicalData = await defiLlamaClient.getHistoricalPrices(input.coins, input.timestamp);
    return createSuccessResponse(`Historical prices: ${JSON.stringify(historicalData, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting historical prices: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getStablecoinsHandler = async (input: GetStablecoinsInput): Promise<ToolResultSchema> => {
  try {
    const stablecoinsData = await defiLlamaClient.getStablecoins();
    return createSuccessResponse(`Stablecoins: ${JSON.stringify(stablecoinsData, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting stablecoins: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getStablecoinDataHandler = async (input: GetStablecoinDataInput): Promise<ToolResultSchema> => {
  try {
    const stablecoinData = await defiLlamaClient.getStablecoinData(input.asset);
    return createSuccessResponse(`Stablecoin data: ${JSON.stringify(stablecoinData, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting stablecoin data: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const searchProtocolsHandler = async (input: SearchProtocolsInput): Promise<ToolResultSchema> => {
  try {
    const protocolsData = await defiLlamaClient.getProtocols();
    
    // Apply name regex filter if provided
    let filteredProtocols = protocolsData;
    if (input.nameRegex) {
      const nameRegex = new RegExp(input.nameRegex, 'i');
      filteredProtocols = filteredProtocols.filter(protocol => nameRegex.test(protocol.name));
    }

    // Apply additional filters if provided
    if (input.filters) {
      filteredProtocols = filteredProtocols.filter(protocol => {
        return Object.entries(input.filters!).every(([key, value]) => {
          const protocolValue = (protocol as any)[key];
          
          // Handle comparison operators for numeric fields
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            if ('gt' in value) return protocolValue > value.gt;
            if ('gte' in value) return protocolValue >= value.gte;
            if ('lt' in value) return protocolValue < value.lt;
            if ('lte' in value) return protocolValue <= value.lte;
          }
          
          // Handle array fields
          if (Array.isArray(protocolValue)) {
            return protocolValue.includes(value);
          }
          
          // Handle regular equality
          return protocolValue === value;
        });
      });
    }

    // Select specified fields if provided
    let result = filteredProtocols;
    if (input.fields) {
      result = filteredProtocols.map(protocol => {
        const filteredProtocol: Record<string, unknown> = {};
        input.fields!.forEach(field => {
          if (field in protocol) {
            filteredProtocol[field] = (protocol as any)[field];
          }
        });
        return filteredProtocol as any;
      });
    }

    // Apply limit if provided
    if (input.limit) {
      result = result.slice(0, input.limit);
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(result)
      }],
      isError: false
    };
  } catch (error) {
    return createErrorResponse(`Error searching protocols: ${error instanceof Error ? error.message : String(error)}`);
  }
};
