# <center> API Web Scraper na AWS </center>

 O Desafio 2 do processo seletivo de estagiário da BGC Brasil consiste em fazer um sistema HTTP API com Node.js rodando localmente usando Serverless Framework, cujo objetivo é pegar os 3 produtos mais vendidos da Amazon.

#### <center> 🚧 Desafio Concluído 🚧 </center>

<p align="center">
    <a href="https://nodejs.org/en">
        <img src="svg/nodejs.svg" alt="nodejs" style="vertical-align:top; margin:6px 4px">
    </a> 
    
    <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">
        <img src="svg/js.svg" alt="js" style="vertical-align:top; margin:6px 4px">
    </a>
    
    <a href="https://aws.amazon.com/pt/">
        <img src="svg/aws.svg" alt="aws" style="vertical-align:top; margin:6px 4px">
    </a>
    
    <a href="https://www.npmjs.com/">
        <img src="svg/npm.svg" alt="npm" style="vertical-align:top; margin:6px 4px">
    </a>
    
    <a href="mailto:paulocarvalho@poli.ufrj.br">
        <img src="svg/gmail.svg" alt="gmail" style="vertical-align:top; margin:6px 4px">
    </a>
    
    <a href="https://www.linkedin.com/in/paulo-carvalho-a893a017b/">
        <img src="svg/linkedin.svg" alt="linkedin" style="vertical-align:top; margin:6px 4px">
    </a>  
</p>

📋 Tabela de conteúdos
=================
<!--ts-->
   * [Tecnologias](#🛠-tecnologias)
   * [Pré-requisitos](#📌-pré-requisitos)
   * [Rodando o Back End (servidor)](#🎲-rodando-o-back-end)
   * [Invocando via HTTP](#🌐-invocando-via-http)
   * [Invocando Localmente](#📍-invocando-localmente)
   * [Autor](#🪞-autor)
<!--te-->

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

👉 [AWS Lambda](https://aws.amazon.com/pt/lambda/)
👉 [AWS API Gateway](https://aws.amazon.com/pt/api-gateway/)
👉 [AWS DynamoDB](https://aws.amazon.com/pt/dynamodb/)
👉 [Serverless Framework](https://www.serverless.com/)
👉 [Node.js](https://nodejs.org/en/)
👉 [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### 📌 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/).

### 🎲 Rodando o Back End

```bash
# Clone este repositório
$ git clone "https://github.com/pa-carvalho/desafio-bgc"

# Acesse a pasta do projeto no terminal/cmd
$ cd desafio-bgc

# Instale as dependências
$ npm install

# Faça o deploy
$ sls deploy
```

Após finalizar o deploy, você verá o seguinte output:

```bash
Deploying desafio-bgc to stage dev (us-east-1)
✔ Your AWS account is now integrated into Serverless Framework Observability
✔ Serverless Framework Observability is enabled

✔ Service deployed to stack desafio-bgc-dev (89s)

dashboard: https://app.serverless.com/paulocarvalho/apps/desafio-bgc/desafio-bgc/dev/us-east-1
endpoint: GET - https://9ohievhgwh.execute-api.us-east-1.amazonaws.com/searches
functions:
  getSearches: desafio-bgc-dev-getSearches (11 MB)
  scraper: desafio-bgc-dev-scraper (11 MB)
```

### 🌐 Invocando via HTTP

Depois de realizar o deploy com sucesso, você pode invocar a aplicação via HTTP:

```bash
curl https://9ohievhgwh.execute-api.us-east-1.amazonaws.com/searches
```

O que deve retornar o que estamos esperando, que seria os 3 produtos mais vendidos da página da Amazon por categoria.

### 📍 Invocando Localmente

Outra opção é invocar a aplicação localmente:

```bash
sls invoke local -f getSearches
```

O output será o mesmo que o anterior (quando invocado via HTTP).

_OBS: Aqui não precisamos inserir o sls deploy na linha de comando_

### 🪞 Autor

<p align="left">
    <a href="#">
        <img src="svg/foto_perfil.jpeg" alt="Foto" style="vertical-align:top; margin:6px 4px">
</p>

Feito com ❤️ por Paulo Carvalho 👋🏽 Entre em contato!
botar badge de gmail e linkedin

<p align="left">
    <a href="mailto:paulocarvalho@poli.ufrj.br">
        <img src="svg/gmail.svg" alt="gmail" style="vertical-align:top; margin:6px 4px">
    </a>
    
    <a href="https://www.linkedin.com/in/paulo-carvalho-a893a017b/">
        <img src="svg/linkedin.svg" alt="linkedin" style="vertical-align:top; margin:6px 4px">
    </a>
</p>