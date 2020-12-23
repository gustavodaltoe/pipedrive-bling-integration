import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: Number(process.env.PORT || '3333'),

  // Bling credentials
  bling: {
    apiKey: process.env.BLING_API_KEY,
  },

  // Pipedrive credentials
  pipedrive: {
    apiToken: process.env.PIPEDRIVE_API_TOKEN,
    companyDomain: process.env.PIPEDRIVE_COMPANY_DOMAIN,
  },
};
