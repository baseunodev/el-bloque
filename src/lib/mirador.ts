// Enlaces al Mirador Cripto (sitio externo de precios). Los slugs tienen que coincidir con los de ese sitio.
import { mirador } from "./site";

const slugOverrides: Record<string, string> = {
  tether: "usdt",
  "usd-coin": "usdc",
  ripple: "xrp",
  binancecoin: "bnb",
  "avalanche-2": "avalanche",
  "the-open-network": "toncoin",
  "hedera-hashgraph": "hedera",
  "crypto-com-chain": "cronos",
  "injective-protocol": "injective",
  "render-token": "render",
  "worldcoin-wld": "worldcoin",
};

const ref = "utm_source=elbloque&utm_medium=referral";
export const miradorHome = `${mirador.url}/?${ref}`;
export const miradorCoin = (id: string) => `${mirador.url}/precio/${slugOverrides[id] ?? id}?${ref}`;
export const miradorPath = (p: string) => `${mirador.url}${p}?${ref}`;
