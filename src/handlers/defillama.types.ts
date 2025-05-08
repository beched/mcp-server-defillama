export interface GetProtocolsInput {
  // No input parameters needed
}

export interface SearchProtocolsInput {
  nameRegex?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  fields?: string[];
  limit?: number;
}

export interface GetProtocolTvlInput {
  protocol: string;
}

export interface GetChainTvlInput {
  chain: string;
}

export interface GetTokenPricesInput {
  coins: string[];
}

export interface GetHistoricalPricesInput {
  coins: string[];
  timestamp: number;
}

export interface GetStablecoinsInput {
  // No input parameters needed
}

export interface GetStablecoinDataInput {
  asset: string;
}
