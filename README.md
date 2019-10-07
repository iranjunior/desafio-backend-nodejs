
# Desafio Backend NodeJS


**Tabela de Conteudos**

 - [Sobre o projeto](#sobre-o-projeto)
 - [Caracteristicas](#caracteristicas)
 - [Inicialização](#inicialização)
	- [Requisitos](#requisitos)
	- [Clonagem do Projeto](#clonagem-do-projeto)
	- [Comandos de inicialização](#comandos-de-inicialização)
- [Estrutura das pastas](#estrutura-das-pastas)
- [Rotas](#rotas)
    - [Tabela de rotas](#tabela-de-rotas)
    - [Exemplos de uso](#exemplos-de-uso)
        - [Criar usuario](#criar-usuario)
        - [Login usuario](#login-usuario)
        - [Buscar usuario](#buscar-usuario)
        - [Atualizar usuario](#atualizar-usuario)
        - [Apagar usuario](#apagar-usuario)
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

## Rotas

A api tem algumas rotas disponiveis para sua atualização, neste documento você encontrar quais rotas são essas e um breve exemplo de como utilizar-las
### Tabela de rotas

As rotas da aplicação estão listadas na tabela abaixo:

Rota  |  Descrição
--------------------  | --------------
`POST /signup`  | Está é uma rota para criar um usuario
`POST /signin`  | Está é a rota de authenticação de usuario
`GET /user/:uuid`  | Está rota busca o usuario com o uuid passado no query paraments, desde que seja o mesmo que está requerindo as informações
`PUT /user`  | Está é a rota que atualiza o usuario que está requerindo as informações
`DELETE /user`  | Está é a rota que apaga o usuario que foi passado no token de authenticação


### Exemplos de uso

#### Criar usuario

```
POST /signup
```

**Headers**
```
Content-Type     application/json
```

**Body**

```
{
    "email": "iranjunior94@gmail.com",
	"name": "Iran Junior",
	"password": "ljhgjhfkufoi",
    "phones": [
    	{
    		"ddd": "081",
    		"phone": "21444687"

    	},
    	{
    		"ddd": "081",
    		"phone": "97747456"

    	},...
    	]
}
```

**Response**
```
{
    "user": {
        "_id": "5d969cfa5c93d146785a0d3b",
        "uuid": "p5kBvyEKU4JvwAEUeqq9KC",
        "lastLogin": "2019-10-04T01:14:40.962Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI4MjYyNzMwMjQwMDAsImlhdCI6MTU3MDE1MTY4MH0.XHmoVntNJqGdAqVO2AkeumG3BAaaSmpbnah7SeVC8a8",
        "createdAt": "2019-10-04T01:14:34.232Z",
        "updatedAt": "2019-10-04T01:14:40.964Z"
    }
}
```


#### Login usuario

```
POST /signin
```

**Headers**
```
Content-Type     application/json
```

**Body**

```
{
    "email": "iranjunior94@gmail.com",
	"password": "ljhgjhfkufoi"
}
```

**Response**
```
{
        "_id": "5d969cfa5c93d146785a0d3b",
        "uuid": "p5kBvyEKU4JvwAEUeqq9KC",
        "lastLogin": "2019-10-04T01:14:40.962Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI4MjYyNzMwMjQwMDAsImlhdCI6MTU3MDE1MTY4MH0.XHmoVntNJqGdAqVO2AkeumG3BAaaSmpbnah7SeVC8a8",
        "createdAt": "2019-10-04T01:14:34.232Z",
        "updatedAt": "2019-10-04T01:14:40.964Z"
}
```


#### Buscar usuario

```
GET /user/5d969cfa5c93d146785a0d3b
```

**Headers**
```
Content-Type     application/json
Authorization    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI4MjYyNzMwMjQwMDAsImlhdCI6MTU3MDE1MTY4MH0.XHmoVntNJqGdAqVO2AkeumG3BAaaSmpbnah7SeVC8a8
```

**Body**

```
```
**Response**
```
{
    "user": {
        "_id": "5d969cfa5c93d146785a0d3b",
        "uuid": "p5kBvyEKU4JvwAEUeqq9KC",
        "email": "iranjunior94@gmail.com",
	    "name": "Iran Junior",
	    "password": "ljhgjhfkufoi",
        "phones": [
    	    {
    	    	"ddd": "081",
    	    	"phone": "21444687"

    	    },
    	    {
    	    	"ddd": "081",
    	    	"phone": "97747456"

    	    },...
    	    ]
        "lastLogin": "2019-10-04T01:14:40.962Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI4MjYyNzMwMjQwMDAsImlhdCI6MTU3MDE1MTY4MH0.XHmoVntNJqGdAqVO2AkeumG3BAaaSmpbnah7SeVC8a8",
        "createdAt": "2019-10-04T01:14:34.232Z",
        "updatedAt": "2019-10-04T01:14:40.964Z"
    }
}
```


#### Atualizar usuario

```
PUT /user
```

**Headers**
```
Content-Type     application/json
Authorization    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI4MjYyNzMwMjQwMDAsImlhdCI6MTU3MDE1MTY4MH0.XHmoVntNJqGdAqVO2AkeumG3BAaaSmpbnah7SeVC8a8
```

**Body**

```
{
    "email": "iranjunior94@gmail.com"
}
```

**Response**
```
```

#### Apagar usuario

```
DELETE /user
```

**Headers**
```
Content-Type     application/json
Authorization    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI4MjYyNzMwMjQwMDAsImlhdCI6MTU3MDE1MTY4MH0.XHmoVntNJqGdAqVO2AkeumG3BAaaSmpbnah7SeVC8a8
```

**Body**

```
```

**Response**
```
```
