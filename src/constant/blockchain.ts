import { ChainInfo } from "@keplr-wallet/types";

export const serverAddress = 'aura1w0ten4x8faffehzsjuae3v9jj5xt45qutwk0te';
export const chainId = 'euphoria-2';
export const denom = 'ueaura';
export const exponent = 1/Math.pow(10,6);
export const inverseExponent = Math.pow(10,6);
export const rpcEndpoint = 'https://rpc.euphoria.aura.network';
export const getTestnetChainInfo = (): ChainInfo => ( {
    "chainId": "euphoria-2",
    "chainName": "Aura Euphoria testnet",
    "rpc": "https://rpc.euphoria.aura.network",
    "rest": "https://lcd.euphoria.aura.network",
    "bip44": {
      "coinType": 118
    },
    "bech32Config": {
      "bech32PrefixAccAddr": "aura",
      "bech32PrefixAccPub": "aurapub",
      "bech32PrefixValAddr": "auravaloper",
      "bech32PrefixValPub": "auravaloperpub",
      "bech32PrefixConsAddr": "auravalcons",
      "bech32PrefixConsPub": "auravalconspub"
    },
    "currencies": [
      {
        "coinDenom": "EAURA",
        "coinMinimalDenom": "ueaura",
        "coinDecimals": 6
      }
    ],
    "feeCurrencies": [
      {
        "coinDenom": "EAURA",
        "coinMinimalDenom": "ueaura",
        "coinDecimals": 6,
        "gasPriceStep": {
          "low": 0.001,
          "average": 0.0025,
          "high": 0.004
        }
      }
    ],
    "stakeCurrency": {
      "coinDenom": "EAURA",
      "coinMinimalDenom": "ueaura",
      "coinDecimals": 6
    },
    "coinType": 118,
    "features": [
      "ibc-transfer"
    ],
    "walletUrlForStaking": "https://euphoria.aurascan.io/validators",
    "beta": true
  });