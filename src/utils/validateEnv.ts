export const validateEnv = () => {
  const requiredEnvVars = ['REACT_APP_EXCHANGE_RATE_API_KEY'];
  
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
};