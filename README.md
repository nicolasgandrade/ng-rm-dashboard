# NgRmDashboard

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) na versão 17.3.7.

## Resumo

Esse é um projeto experimental em Angular 17 que consome a [Rick and Morty API](https://rickandmortyapi.com/), e lista os dados recebidos em 2 listas: 1 de episódios, outra de personagens.
Ambas as listas são paginadas com scroll infinito e reagem a uma barra de busca global, localizada no header do dashboard.
Ao clicar em um card (tanto de episódio quanto de personagem), um modal com mais detalhes sobre a entidade é aberto.

Nesse projeto mesclei conceitos mais consolidados do Angular, assim como conceitos mais novos como `signals`, `standalone components`, `input()` e `output()` functions, novo sintaxe de fluxo de controle, etc.

Para facilitar o gerenciamento de estado, utilizei a biblioteca `ngrx-component-store`, que provê uma abordagem de gerenciamento standalone. Entretanto, no service `global-search.service.ts`, por se tratar de um serviço simples, fiz o gerenciamento de estado utilizando `signals`.

## Servidor de Desenvolvimento (localhost)

Para rodar a aplicação, clone o repositório e na raíz do projeto rode:

```bash
$ npm install
-
$ npm start
```

Quando iniciado, abra a aplicação em `http://localhost:4200/w/episodes`.

### Funcionalidades

Lista de episódios: `http://localhost:4200/w/episodes`

Lista de personagens: `http://localhost:4200/w/characters`

## Tecnologias

Para o desenvolvimento desse projeto, foram utilizadas as seguintes tecnologias:

1. Angular (17.3.0)
2. Bootstrap 5 / NgBootstrap (16.0.0)
3. NgRx Component Store (17.2.0)
4. Ngx Infinite Scroll (17.0.0)
5. RxJS (7.8)
