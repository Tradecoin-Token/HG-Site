const idsOfTokens = {
  "8DLiYZjo3UUaRBTHU7Ayoqg4ihwb6YH1AfXrrhdjQ7K1": 6,
  "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ": 6,
  "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ": 6,
  "8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS": 8,
  'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p': 6,
  "7RgM3A5AVCUZFbL3EwBicv1eHFCVsaY8z71yda77zrAv": 8,
  'FXvNWA5Gfy8yLPHGScm6Gmn4DSZX9brFZ9qmEkPxAhGk': 8,
  "2fCdmsn6maErwtLuzxoUrCBkh2vx5SvXtMKAJtN4YBgd": 3,
};
const nameOfTokens = {
  "8DLiYZjo3UUaRBTHU7Ayoqg4ihwb6YH1AfXrrhdjQ7K1": 'BUSD',
  "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ": 'USDT',
  "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ": 'USDC',
  "8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS": 'BITCOIN',
  'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p': 'USDN',
  "7RgM3A5AVCUZFbL3EwBicv1eHFCVsaY8z71yda77zrAv": 'HASH',
  'FXvNWA5Gfy8yLPHGScm6Gmn4DSZX9brFZ9qmEkPxAhGk': 'KUSD',
  "2fCdmsn6maErwtLuzxoUrCBkh2vx5SvXtMKAJtN4YBgd": 'RKMT',
};

export function getDecimal(tokenId) {
  return idsOfTokens[tokenId] ? idsOfTokens[tokenId] : 8;
}

export function getName(tokenId) {
  return nameOfTokens[tokenId] ? nameOfTokens[tokenId] : 'WAVES';
}

