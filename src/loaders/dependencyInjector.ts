import axios from 'axios';
import Container from 'typedi';
import config from '../config';
import order from '../models/order';

export default () => {
  const models = [
    {
      name: 'orderModel',
      model: order,
    },
  ];
  models.forEach(m => {
    Container.set(m.name, m.model);
  });

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
