# MVP Frontend - Agenda de Contatos

Aplicação frontend desenvolvida como parte do MVP da disciplina **Desenvolvimento Full Stack Básico** da pós-graduação em Desenvolvimento Full Stack da **PUC-Rio**. O projeto consiste em uma SPA (Single Page Application) construída com **HTML, CSS e JavaScript puro**, com o objetivo de permitir o cadastro, listagem, edição, busca e exclusão de contatos telefônicos por meio do consumo de uma API REST em Flask.

## Objetivo

A aplicação foi criada para facilitar o gerenciamento de contatos pessoais ou profissionais em uma interface simples, organizada e responsiva. Ela demonstra, na prática, a separação entre frontend e backend, a comunicação com API via `fetch`, a renderização dinâmica de dados em cards e o uso de navegação em página única sem frameworks SPA como React, Angular ou Vue. [1]

## Funcionalidades

- Cadastro de contatos com os campos: nome, sobrenome, apelido, celular e e-mail.
- Listagem de contatos em formato de cards.
- Busca de contatos por nome.
- Edição de contatos existentes.
- Exclusão de contatos.
- Exibição de mensagens de status para ações do usuário.
- Navegação por seções da própria página.
- Integração com todas as rotas principais da API. [1]

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API para consumo da API REST
- Bootstrap Icons
- Python `http.server` para servir os arquivos do frontend localmente

## Como executar o projeto

Este frontend utiliza chamadas `fetch` para a API Flask local. Por isso, em alguns navegadores, abrir o arquivo `index.html` diretamente pelo protocolo `file://` pode bloquear a comunicação com o backend. Para evitar esse problema, o projeto inclui um modo simples de execução local usando o servidor HTTP nativo do Python.

### Pré-requisitos

- Ter o **Python** instalado na máquina.
- Ter o **backend em execução** na porta `5000`.
- Estar com os arquivos do frontend baixados localmente.

### Passo a passo

1. Clone o repositório do frontend:

```bash
git clone https://github.com/ronnansants/mvp1-front.git
```

2. Entre na pasta do projeto:

```bash
cd mvp1-front
```

3. Inicie primeiro o backend em outro terminal, para garantir que a API esteja disponível em `http://127.0.0.1:5000`.

4. Na raiz do frontend, execute o arquivo `abrir.bat` com duplo clique, ou rode manualmente o comando abaixo no terminal:

```bash
python -m http.server 8000
```

5. Abra o navegador e acesse:

```text
http://127.0.0.1:8000
```

6. Com o backend ativo e o frontend aberto nessa URL, a aplicação poderá listar, cadastrar, editar, buscar e excluir contatos normalmente.

## Estrutura esperada de execução

Para o funcionamento correto do sistema, os dois projetos devem estar ativos ao mesmo tempo:

- **Backend**: `http://127.0.0.1:5000`
- **Frontend**: `http://127.0.0.1:8000`

## Integração com a API

O frontend consome a API Flask localmente por meio da URL base abaixo:

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
- `DELETE /contatos/<id>` — exclui um contato. [1]

## Observações importantes

- Abrir o `index.html` diretamente no navegador pode impedir a comunicação com a API por causa de restrições de origem do navegador ao usar `fetch` com `file://`.
- O uso do comando `python -m http.server 8000` foi adotado para permitir a execução local do frontend de forma simples, sem dependências extras.
- O arquivo `abrir.bat` existe para facilitar a inicialização do frontend no Windows.
- Sem a API ativa, o frontend não conseguirá listar, cadastrar, editar ou excluir contatos.

## Autor

**Ronnan Santos**  
Aluno da pós-graduação em Desenvolvimento Full Stack
