
# Desafio - Backend Júnior 1

Este desafio foi projetado para avaliar a sua capacidade técnica como candidato ao cargo de Desenvolvedor Backend Júnior. Esperamos que você demonstre habilidades em autenticação, autorização e manipulação de dados utilizando tecnologias comuns em desenvolvimento backend.

## Proposta

Implemente um sistema de autenticação e autorização em uma API RESTful usando JWT (JSON Web Tokens). A aplicação deve ter as seguintes funcionalidades:

- Criar banco de dados
- Disponibilizar um arquivo chamado "creation.sql" para os intrevistadores validar a criação
- Conexão com o banco de dados
- Criar rota para registro de usuários
- As senhas dos usuário devem estar criptografadas (Ex.: Usando um hash do bycript)
- Criar rota para login de usuários, gerando um token JWT ao logar
- Criar rota para adicionar um item ao usuário protejida pelo JWT
- Criar rota para buscar os itens do usuário protejida pelo JWT
- Criar rota para atualização dos itens do usuário protejida pelo JWT
- Criar rota para exclusão de um item do usuário protejida pelo JWT

**Observações:**
> - Você pode criar as tabelas do modo que você achar melhor, respeitando somente que as chaves primárias devem ser um UUID;
> - Os itens que devem ser cadastrados para usuário você pode escolher como deve ser feito;

#### Você deve usar as tecnologías
- NodeJS
- Express
- Typescript 

#### Você deve usar o banco de dados relacional
- Postgresql
