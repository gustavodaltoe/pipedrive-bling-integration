# Integração entre Pipedrive e Bling

## Instruções para executar a aplicação

`yarn install` para instalar as dependências

`cp .env.example .env` para copiar o arquivo de variáveis de ambiente e preencha com as informações do bling, pipedrive e mongo

`yarn start` para iniciar o servidor

## Endpoints

**/integration/start** -> Inicia a importação dos dados do pipedrive para o bling e retorna a quantidade de oportunidades processadas.

**/integration/orders** -> Lista todas as oportunidades que foram consolidadas na collection do MongoDB.

## Desafio:

### Objetivo

Deverá construir uma API RESTful usando a tecnologia NodeJS.


### Requisitos

- [x] Criar contas testes nas plataformas Pipedrive e Bling.

- [x] Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

- [x] Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça

- [x] Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

- [x] Criar endpoint para trazer os dados consolidados da collection do MongoDB.


### Instruções

- Desenvolva e versione o projeto usando git

- Utilize o GitHub para hospedar o código

- Enviar o link do repositório para people@linkapi.com.br


### O que será avaliado

- Quantidade de requisitos realizados

- Desacoplamento de código

- Legibilidade

- Boas práticas de desenvolvimento de API RESTful

- Performance

