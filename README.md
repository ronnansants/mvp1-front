# MVP Frontend - Agenda de Contatos

Aplicação frontend desenvolvida como parte do MVP da disciplina **Desenvolvimento Full Stack Básico** da pós-graduação em Desenvolvimento Full Stack da **PUC-Rio**.

O projeto consiste em uma SPA (Single Page Application) construída com **HTML, CSS e JavaScript puro**, com o objetivo de permitir o cadastro, listagem, edição, busca e exclusão de contatos telefônicos por meio do consumo de uma API REST em Flask.

## Objetivo

A aplicação foi criada para facilitar o gerenciamento de contatos pessoais ou profissionais em uma interface simples, organizada e responsiva.

Ela demonstra, na prática, a separação entre frontend e backend, a comunicação com API via `fetch`, a renderização dinâmica de dados em cards e o uso de navegação em página única sem frameworks SPA como React, Angular ou Vue.

## Funcionalidades

- Cadastro de contatos com os campos:
  - Nome
  - Sobrenome
  - Apelido
  - Celular
  - E-mail

- Listagem de contatos em formato de cards.
- Busca de contatos por nome.
- Edição de contatos existentes.
- Exclusão de contatos.
- Exibição de mensagens de status para ações do usuário.
- Navegação por seções da própria página.
- Integração com todas as rotas principais da API.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API para consumo da API REST
- Bootstrap Icons

## Como executar o projeto

Este frontend foi desenvolvido para atender ao requisito de abrir corretamente **diretamente no navegador**, sem necessidade de servidor local adicional.

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/ronnansants/mvp1-front.git
```

2. Acesse a pasta do projeto:

```bash
cd frontend-contatos
```

3. Abra o arquivo `index.html` diretamente no navegador.

### Exemplo:

- clique duas vezes no arquivo `index.html`, ou
- use a opção “Abrir com” no navegador de sua preferência.

## Integração com a API

O frontend consome a API Flask localmente por meio da URL:

```javascript
http://127.0.0.1:5000
```

Antes de utilizar o sistema, é necessário garantir que o backend esteja em execução corretamente.

### Rotas consumidas no frontend

- `GET /contatos` — lista todos os contatos.
- `GET /contatos?nome=...` — busca contatos por nome.
- `GET /contatos/<id>` — carrega um contato para edição.
- `POST /contatos` — cadastra um novo contato.
- `PUT /contatos/<id>` — atualiza um contato existente.
- `DELETE /contatos/<id>` — exclui um contato.

## Autor

**Ronnan Santos**  
Aluno da pós-graduação em Desenvolvimento Full Stack

## Observação

Para o funcionamento completo da aplicação, o backend deve estar em execução localmente.  
Sem a API ativa, o frontend não conseguirá listar, cadastrar, editar ou excluir contatos.
