# Ecups

Ecups é uma aplicação para gestão de campeonatos de e-sports.
O intuito dela é ser rápido! Sem muitas burocracias, é destinada
a gamers comuns que querem jogar um campeonato amador com seus parças
no final de semana <3.

Sou um apaixonado por novos conhecimentos, então em cada projeto me encarreguei de testar novas tecnologias e me aperfeicoar em algumas que eu ja conhecia =D.

## Partes do Ecups:

- 1 [Api - Em Andamento - (NestJS, MongoDB, Postgresql, Typescript)](https://github.com/antunesgabriel/ecups)
- 2 [Front Web - Em Andamento - (ReactJS, Material-ui)](https://github.com/antunesgabriel/ecups-front)
- 3 [App - Em Andamento - (React Native, Typescript, React Native UI Kitten, Git Flow)](https://github.com/antunesgabriel/ecups-app)

## Preview: 
[https://ecups.netlify.app/](https://ecups.netlify.app/)

## Como rodar:

- 1 Clone o projeto:

```console
$ git clone https://github.com/antunesgabriel/ecups-front && cd ecups-front
```

- 2 Instale as dependecias:

```console
$ yarn or npm i
```

- 3 Sete as variaveis de ambiente:

```console
$ cp ./.env.example ./.env
$ gedit ./.env
```

```env
REACT_APP_API_URL= url da api
REACT_APP_ADMIN_ROLE=ADMIN
REACT_APP_PLAYER_ROLE=PLAYER
REACT_APP_PERSIST_KEY=key_do_redux_persist
```

- 4 Rode a aplicação:

```console
$ yarn start
```

- 5 Voalá! App rodando em http://localhost:3000

Login como admin: http://localhost:3000/admin/signin <br>
Login como player: http://localhost:3000/player/signin
