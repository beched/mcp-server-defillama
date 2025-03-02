# MCP Server for DefiLlama

This is an MCP (Model Context Protocol) server for the DefiLlama API, providing Claude with access to DeFi data.

## Available Tools

- `defillama_get_protocols`: List all protocols tracked by DefiLlama
- `defillama_get_protocol_tvl`: Get TVL data for a specific protocol
- `defillama_get_chain_tvl`: Get TVL data for a specific chain
- `defillama_get_token_prices`: Get current prices of tokens
- `defillama_get_historical_prices`: Get historical prices of tokens
- `defillama_get_stablecoins`: List all stablecoins tracked by DefiLlama
- `defillama_get_stablecoin_data`: Get data for a specific stablecoin

## Setup

```bash
npm install
npm run build
npm start
```
