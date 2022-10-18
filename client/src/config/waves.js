const platform = "prod";
const NodeUrls = {
  testnet: "https://testnet.wavesplatform.com",
  prod: "https://nodes.wavesplatform.com",
};
const SeedProviderUrls = {
  testnet: "https://testnet.waves.exchange/signer/",
  prod: "https://waves.exchange/signer/",
};
const CloudProviderUrls = {
  testnet: "https://testnet.waves.exchange/signer-cloud/",
  prod: "https://waves.exchange/signer-cloud/",
};
const explorerUrls = {
  testnet: "https://testnet.wavesexplorer.com",
  prod: "https://new.wavesexplorer.com",
};
const apiUrls = {
  testnet: "https://api.testnet.wavesplatform.com",
  prod: "https://api.wavesplatform.com",
};
const ChainIDs = {
  testnet: 84,
  prod: 87,
};
const AccountUrls = {
  testnet: "https://testnet.waves.exchange/sign-in",
  prod: "https://waves.exchange/sign-in",
};

const BaseUrl = {
  testnet: "https://localhost:3000",
  prod: "https://hashgreed.com",
};

const config = {
  WAVES_PLATFORM: platform,
  NODE_URL: NodeUrls[platform],
  SEED_PROVIDER_URL: SeedProviderUrls[platform],
  CLOUD_PROVIDER_URL: CloudProviderUrls[platform],
  EXPLORER_URL: explorerUrls[platform],
  API_URL: apiUrls[platform],
  WAVES_ID: "WAVES",
  WAVES_DECIMALS: 8,
  BUSD_ID: "8DLiYZjo3UUaRBTHU7Ayoqg4ihwb6YH1AfXrrhdjQ7K1",
  BUSD_DECIMALS: 6,
  USDT_ID: "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ",
  USDT_DECIMALS: 6,
  USDC_ID: "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ",
  USDC_DECIMALS: 6,
  BTC_ID: "8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS",
  BTC_DECIMALS: 8,
  ETH_ID: "474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu",
  ETH_DECIMALS: 8,
  BNB_ID: "5UYBPpq4WoU5n4MwpFkgJnW3Fq4B1u3ukpK33ik4QerR",
  BNB_DECIMALS: 8,
  USDN_ID: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
  USDN_DECIMALS: 6,
  HASH_ID: "7RgM3A5AVCUZFbL3EwBicv1eHFCVsaY8z71yda77zrAv",
  HASH_DECIMALS: 8,
  KUSD_ID: "FXvNWA5Gfy8yLPHGScm6Gmn4DSZX9brFZ9qmEkPxAhGk",
  KUSD_DECIMALS: 8,
  RKMT_ID: "2fCdmsn6maErwtLuzxoUrCBkh2vx5SvXtMKAJtN4YBgd",
  RKMT_DECIMALS: 3,

  CHAIN_ID: ChainIDs[platform],
  ACCOUNT_URL: AccountUrls[platform],
  BASE_URL: BaseUrl[platform],
  HASHGIG_FEE: "3PG1NyiC2rdgX46jb8c5zPGuEAzWXhr4L2W",
  SMART_CONTRACT: "3P7JCNf1Z8uPWaNayLg2hTrhgLktDxgfXmm",
  STAKE_SCRIPT: "3P5fYAZWS8P7vKHgs4KD82RzhBTdt53c8Db",

  NFT_SCRIPT: "3PJKkEKwuySZDAzFvNouVA5Ke2uLsyx5bAe",
  LOAN_SCRIPT: "3P32KGEZqhNghPFjTPztpJMMWLcpiZJPwdP",
  SPORT_SCRIPT: "3P9c6g3Gf9dukaBYfwecszX3Ctdwch467tk",
  UUID_NAMESPACE: "3874fba0-9bb1-5478-83f9-fec000a97d2a",
  NFT_MINT_SCRIPT: "3PQdVNjaDKiurWqQ5THGxuPLXc3ta2MA3e2",
  LOCKITTY_SCRIPT: "3PEKQpaZWzprBgM7964JoLovajRrTyikn2H",
  HASHGIG_SCRIPT: "3PHSC1X1nwLs9JmqMGHkUh1LcpdAopBzbM8",
};

export default config;
