
# Desafio Backend NodeJS


**Tabela de Conteudos**

 - [Sobre o projeto](#sobre-o-projeto)
 - [Caracteristicas](#caracteristicas)
 - [Inicialização](#inicialização)
	- [Requisitos](#requisitos)
	- [Clonagem do Projeto](#clonagem-do-projeto)
	- [Comandos de inicialização](#comandos-de-inicialização)
- [Estrutura das pastas](#estrutura-das-pastas)
## Sobre o projeto

Este desafio trate-se de uma das etapas no processo seletivo para a Concrete Solutions neste projeto é empregrado varias bibliotecas para um desenvolvimento eficaz da api, tais como :  **Express**, **Mongoose**, **Jest**, **ESLint**, **Cors**,  **Faker**, entre outras.

## Caracteristicas
- Sem uso de framewoks
- Express + MongoDB
- ORM [Mongoose](https://mongoosejs.com/)
- Testes automatizado com [Jest](https://jestjs.io/)
- Cors ativado
- Utilizando [Helmet](https://github.com/helmetjs/helmet) para proteção segurança nos headers
- Organização e padronização de códigos com [ESLint](https://github.com/eslint/eslint)
- Criação e utilização de variaveis de ambiente com o [dotEnv](https://github.com/motdotla/dotenv)
- Integração com [Docker](https://www.docker.com/get-started)
- Automação de criação de dados para testes com [Faker](https://github.com/Marak/faker.js)


## Inicialização

### Requisitos
- [Node](https://nodejs.org/en/download/) ou [Docker](https://docs.docker.com/install/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install) ou [NPM](https://www.npmjs.com/get-npm)

### Clonagem do Projeto
Para clonar este desadio em seu reositorio local, você ira precisar do [Git](https://git-scm.com/ "Git"), uma vez instalado corretamente você pode executar o comando: 
```bash
$ git clone https://github.com/iranjunior/desafio-backend-nodejs.git
```
ou caso você tenha uma chave ssh configurada:
```bash
$ git clone git@github.com:iranjunior/desafio-backend-nodejs.git
```
por fim execute o comando para entrar na pasta que foi criada e instalar as dependencias do projeto
```bash
$ cd desafio-backend-nodejs
$ yarn install
```

### Comandos de inicialização

Para iniciar a aplicação basta executar o comando: `yarn start` ou `npm start`mas existe alguns comandos que podem lhe ajudar a realizar tarefas especificas como testes unitarios, testes de integração, cobertura dos testes, debugs do banco de dados, reinicialização do servidor em caso de mudança em arquivos, etc. Uma lista completa sobre os comandos de inicialização pode ser vista abaixo:

Comandos  | Tarefa a ser realizada
------------- | -------------
`yarn start` | Inicializa o serviço em ambiente de produção
`yarn dev` | Inicializa o serviço em ambiente de desenvolvimento, este modo de inicialização permite que serviço seja reiniciado sempre  que houver uma mudança nos arquivo do projeto
`yarn test` | Realiza todos os testes localizados na pasta tests
`yarn test:unit`  | Realiza todos os testes unitários
`yarn test:integrations`  | Realiza todos os testes de integração com o banco de dados
`yarn test:coverage`  | Realiza todos os testes e mostra os arquivos cobridos pelo teste
`yarn lint`  | Executa o ESLint nos arquivos da aplicação

## Estrutura das pastas
```
├─── __tests__/
	├─── Integrations/
		└─── ...
	├─── Units/
		└─── ...
	├─── Utils/
		└─── ...
	...
├─── src/
	├─── App/
		├─── Controllers/
			└───...
		├─── Middlewares/
			└─── ...
		├─── Models/
			└───...
	├─── Config/
		└───...
	├─── Utils/
		└─── ...
	...
```
