Ordens e Pagamentos
===================

_Explorando os conceitos de mensageria e microserviços com NestJS e Kafka_

![Node.js Version](https://img.shields.io/badge/Node.js-20.3-green) ![TypeScript Version](https://img.shields.io/badge/TypeScript-5.1-blue) ![NestJS Version](https://img.shields.io/badge/NestJS-10.0-red) ![Prisma Version](https://img.shields.io/badge/Prisma-4.16-orange) ![Kafka Version](https://img.shields.io/badge/Kafka-2.2-yellow)

📖 Descrição
------------

O projeto "Ordens e Pagamentos" é uma aplicação desenvolvida com o objetivo de explorar os conceitos de mensageria e microserviços, utilizando as tecnologias NestJS e Kafka. O projeto tem como finalidade permitir a criação e manipulação de ordens e pagamentos, fornecendo uma experiência prática na implementação de microserviços independentes e sua integração.

🚀 Tecnologias Utilizadas
-------------------------

*   Node.js
*   TypeScript
*   NestJS
*   Prisma
*   MySQL
*   Kafka
*   Docker
*   Docker Compose

📁 Estrutura do Projeto
-----------------------

O projeto é composto por dois servidores "distintos" localizados nas pastas `apps/orders` e `apps/payments`. Cada servidor possui responsabilidades específicas relacionadas à criação, processamento e comunicação das ordens e pagamentos.

```
.
├── apps
│   ├── orders
│   │   ├── src
│   │   │   ├── controllers
│   │   │   ├── services
│   │   │   └── ...
│   │   └── ...
│   └── payments
│       ├── src
│       │   ├── controllers
│       │   ├── services
│       │   └── ...
│       └── ...
├── ...
├── docker-compose.yml
└── ...
```

🛠️ Como Executar
-----------------

### 1\. Configuração

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

### 2\. Clonar o Repositório
```
git clone https://github.com/seu-usuario/ordens-pagamentos.git
```
### 3\. Executar o Docker Compose

Acesse a pasta raiz do projeto e execute o seguinte comando para iniciar os containers:
```
docker-compose up
```
Este comando iniciará os serviços necessários, incluindo o servidor Kafka.

### 4\. Configuração das Aplicações

#### 4.1 App
Acesse o terminal do docker usando o seguinte comando:
```
docker compose exec app bash
```
Logo após instale as depêndencias do projeto:
```
npm install     # Instalar as dependências
```
*Observação: É necessário a utilização do terminal executado pelo docker compose para as próximas etapas.*

#### 4.2 Orders

Acesse a pasta `apps/orders` e execute os seguintes comandos:
```
cd apps/orders     # Acessar a pasta
npx prisma migrate dev    # Executar as migrações do Prisma
npm run start:dev   # Iniciar o servidor de ordens
```
#### 4.3 Payments

Acesse a pasta `apps/payments` e execute os seguintes comandos:
```
npm install     # Instalar as dependências
npx prisma migrate dev    # Executar as migrações do Prisma
npm run start:dev payments    # Iniciar o servidor de pagamentos
```

🛠️ *Opcional* Como Executar com *Dev Container*
-----------------

### 1\. Configuração

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina e o plugin do Dev Container no VSCode.

### 2\. Clonar o Repositório
```
git clone https://github.com/seu-usuario/ordens-pagamentos.git
```
### 3\. Abrir o projeto com o Dev Container

Acesse a pasta raiz do projeto, abra a paleta de comandos do VSCode e digite por:
```
Dev Containers: Open Folder in Container
```
Este comando iniciará os a configuração necessária. Será preciso inserir o diretório do projeto após avançar no comando.

### 4\. Configuração das Aplicações

#### 4.1 App
Instale as depêndencias do projeto:
```
npm install     # Instalar as dependências
```

#### 4.2 Orders

Acesse a pasta `apps/orders` e execute os seguintes comandos:
```
cd apps/orders     # Acessar a pasta
npx prisma migrate dev    # Executar as migrações do Prisma
npm run start:dev   # Iniciar o servidor de ordens
```
#### 4.3 Payments

Acesse a pasta `apps/payments` e execute os seguintes comandos:
```
cd apps/payments     # Acessar a pasta
npx prisma migrate dev    # Executar as migrações do Prisma
npm run start:dev payments    # Iniciar o servidor de pagamentos
```

📝 Utilização
-------------

O arquivo api.http, localizado na raiz do projeto, contém as requisições necessárias para interagir com a API. Para executar essas requisições diretamente no editor, você pode utilizar o plugin do VSCode chamado 'REST Client'.
