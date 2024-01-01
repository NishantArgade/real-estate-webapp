import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: process.env.AUTH2_AUDIENCE,
  issuerBaseURL: process.env.AUTH2_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH2_TOKEN_SIGNING_ALG,
});

export default jwtCheck;
