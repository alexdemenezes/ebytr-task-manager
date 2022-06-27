# TASK MANAGER API
API desenvolvida para  uma aplicação que gerencia tarefas. Contém um CRUD completo de usuários e tarefas.

<img src= "https://img.shields.io/badge/Node-v16.15.0-blue">  <img src="https://img.shields.io/badge/license-MIT-green"> <img src= "https://img.shields.io/badge/PRs-welcome-green">

Tabela de conteúdos
=================
<!--ts-->
   * [Instalação](#instalacao)
   * [Configuração local](##Configuração-local)
   * [Como usar](#como-usar)
   * [Endpoints](#endpoints)
      * [users](#users)
        * [criar](#create)
        * [ler](#read)
        * [atualizar](#update)
        * [deletar](#delete)
      * [tasks](#tasks)
        * [criar](#create)
        * [ler](#read)
        * [atualizar](#update)
        * [deletar](#delete)
   * [Tests](#testes)
   * [Tecnologias](#tecnologias)
<!--te-->

Instalação
=================

Clone o repositório do projeto na sua máquina rodando o seguinte comando:
```
git clone git@github.com:alexdemenezes/project-task-manager.git
```
Entre na pasta `backend` do projeto:
```
cd project-task-manager && cd backend
```
instale as dependências rodando o seguinte comando:
```
npm install
```

## Configuração local
É necessário ter o mysql instalado e configurado.

Renomeie o arquivo `.env.example` para `.env`

Configure o arquivo `.env`

```
SERVER_PORT=   
DB_USER= 
DB_PASS=
DB_NAME=
DB_HOST=
DB_PORT=
JWT_SECRET=
```

`SERVER_PORT=` Porta que você quer que o servidor escute.

`DB_USER=` Seu nome de usuário no mysql.

`DB_PASS=` Sua senha no mysql (caso tenha).

`DB_NAME=` Nome do banco de dados.

`DB_HOST=` Local onde seu banco está hospedado. (caso esteja apenas na sua máquina local coloque `localhost` ou `127.0. 0.1` ambos significam a mesma coisa).

`DB_PORT=` Porta do seu banco mysql (por padrão a porta do mysql é `3306`).

`JWT_SECRET=` Sua chave secreta que será usada para gerar e validar o token de autenticação do usuário.






