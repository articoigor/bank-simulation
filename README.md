# Omni Saúde App - Sistema de Transação Financeira

## Resumo

O projeto foi construído baseado nos contratos e descrição disponibilizados no repositório _omnipharma/omni_technical_challenge_. Para a stack, utilizei o framework Nest.js para as APIs, uma instância de SQL Server/Database hospedados na Azure utilizando o tier gratuito, o Redis para armazenamento e recuperação de tokens de acesso para validação de sessão de usuários além de construir alguns testes unitários mais simples e disponibilizar uma imagem docker para execução através do _Docker Compose_.

## Detalhes das Rotas

Abaixo segue a lista das rotas adicionadas e suas descrições/contratos:


| Verbo | Endpoint              | Descrição                                  | Expected Params                                | Expected Result                     |
|--------|-----------------------|----------------------------------------------|------------------------------------------------|-------------------------------------|
| POST   | `/users/signup`     | Cadastrar novo usuário.                         | `{ "username": "admin", "password": "123", "birthdate": "14/01/1999" }` | `{ "id": 1 }` |
| POST   | `/users/signin`       | Logar um usuário já criado.                    | `{ "username": "admin", "password": "123" }` | `{ "token": "valid-jwt-token", "expiresIn": "2024-10-30T03:58:18.234Z" }` |
| GET    | `/users`              | Recupera a lista de usuários cadastrados.               | `{ }`                                        | `[ { "id": 1, "username": "admin", birthdate: "14/01/1999", balance: 100 }, ... ]` |
| POST  | `/users/balance`      | Atualiza o saldo de um usuário.                    | `{ "id": "1", "newBalance": 500 }`          | `No content`  |
| POST   | `/transfer`   | Processa a transferência de saldo entre usuários.         | `{ "fromId": "1", "toId": "2", "amount": 50 }` | `No content` |

*OBS: Apesar de divergente da documentação, optei por adicionar uma rota update para que fosse possível atualizar o saldo (balance) de um usuário cadastrado. Isso pois pelas definições dadas, esse dado não teria como ser alterado senão pela rota _/transfer_, logo, não simularia de fato operações financeiras com dados variáveis.*

## Requerimentos

Caso opte por utilizar um conteiner pra executar a aplicação, serão necessários os seguintes recursos:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose com Docker Desktop](https://docs.docker.com/compose/install/)

## Instruções

Siga esse passo a passo para conseguir executar o projeto localmente:

1. **Clone o repositório**  
   Clone o repositório para a sua máquina usando:
   ```bash
   git clone https://github.com/articoigor/bank-simulation

2. **Acesse o diretório**  
   Acesse o diretório criado executando o comando:
   ```bash
   cd bank-simulation

3. **Adicione o arquivo .env**
   Junto ao email onde disponibilizei o link para esse repositório, há também em anexo o arquivo .env com as variáveis mais sensíveis. Basta adicionar ao diretório recém acessado e prosseguir.

4. **Execute a aplicação**
  Para esse passo, existem duas possibilidades de execução: a primeira e mais direta utiliza os comandos _npm i_ seguido de _npm run start_. A segunda é baseada em Docker e já deixei uma configuração simples com um Dockerfile e docker-compose.yml preparados para execução, bastando utilizar o comando _docker-compose up_ se já tiver garantido ter as aplicações Docker e Docker Compose/Desktop instaladas e preparados na máquina.