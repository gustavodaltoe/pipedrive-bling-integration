import axios from 'axios';
import Container from 'typedi';
import config from '../config';

export default () => {
  Container.set(
    'pipedriveApi',
    axios.create({
      baseURL: `https://${config.pipedrive.companyDomain}.pipedrive.com/api/v1/`,
      params: {
        api_token: config.pipedrive.apiToken,
      },
    }),
  );

  Container.set(
    'blingApi',
    axios.create({
      baseURL: 'https://bling.com.br/Api/v2/',
      params: {
        apikey: config.bling.apiKey,
      },
    }),
  );
};
