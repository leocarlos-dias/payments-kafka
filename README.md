# Ordens e Pagamentos

O projeto "Ordens e Pagamentos" é uma aplicação desenvolvida com o objetivo de aprender e explorar os conceitos de mensageria e microserviços. Utilizando as tecnologias NestJS e Kafka, o projeto permite entender e praticar a arquitetura distribuída de serviços, a comunicação assíncrona e a troca de mensagens entre componentes. Ao criar e manipular ordens e pagamentos, você ganhará experiência na implementação de microserviços independentes e na integração entre eles.

## Tecnologias Utilizadas
- Node.js
- TypeScript
- NestJS
- Prisma
- MySQL
- Docker
- Docker Compose

## 3 - Estrutura do Projeto

O projeto é um monolito que contem dois servidores "distintos", nas pastas `apps/orders` e `apps/payments`.

### 3.1 - Orders

A pasta `apps/orders` contém o sistema para publicar uma mensagem quando a ordem for gerada e consumidar quando o pagamento for processado.

### 3.2 - Payments

A pasta `apps/payments` contém o sistema para consumir a ordem e publicar o resultado do processamento.

## 4 - Como Executar
Siga as instruções abaixo para executar o projeto em sua máquina local.

### 4.1.0 - Rodando pelo docker compose:
Acesse a pasta `payments-kafka` e abra o VSCode:
```
cd payments-kafka && code .
```
Rode os containers com o comando:
```
docker compose up
```
Entre no container do app:
```
docker compose exec app bash
```
Instale as dependências:
```
npm install
```
### 4.1.1 - Orders
Rode o comando para o prisma realizar a migrate:
```
cd apps/orders && npx prisma migrate dev
```
Para rodar a aplicação rode o comando:
```
npm run start:dev
```
### 4.1.2 - Payments
Rode o comando para o prisma realizar a migrate:
```
cd apps/payments && npx prisma migrate dev
```
Para rodar a aplicação rode o comando:
```
npm run start:dev payments
```

OBSERVAÇÃO: Caso precise parar os containers por algum motivo rode o comando: docker compose down, pois o container do Kafka precisa ser parado e restartado.

### 4.2.0 - Rodando pelo dev container:
Instale as dependências:
```
npm install
```
### 4.2.1 - Orders
Rode o comando para o prisma realizar a migrate:
```
cd apps/orders && npx prisma migrate dev
```
Para rodar a aplicação rode o comando:
```
npm run start:dev
```
### 4.2.2 - Payments
Rode o comando para o prisma realizar a migrate:
```
cd apps/payments && npx prisma migrate dev
```
Para rodar a aplicação rode o comando:
```
npm run start:dev payments
```
OBSERVAÇÃO: Caso precise parar os containers por algum motivo faça como abaixo:
Digite ctrl + shift + p e selecione Dev Containers: Rebuild Containers, pois o container do Kafka precisa ser parado e restartado.

## 5 - Como utilizar
O arquivo `api.http` na raiz contém as requisições necessárias para reproduzir o ambiente. Você pode usa-lo com o plugin do VSCode REST Client. Quando enviar dados na requisição, o consumirá a mensagem e mostrará no console.