![](https://ui.decentraland.org/decentraland_128x128.png)

# Agora

A place for the Decentraland community to vote on important topics

## Running the project

The core technologies of the marketplace are:

* [React](https://reactjs.org/) and [Redux](https://redux.js.org/) for the front end
* [nodejs](https://nodejs.org/), [PostgreSQL](https://postgresapp.com/)
* [Ethereum](https://www.ethereum.org/) nodes and a wallet to use on the browser ([Metamask](http://metamask.io/) for example).
* [TypeScript](https://www.typescriptlang.org/) for static type checking and code transpilation [TSLint](https://palantir.github.io/tslint/) alongside [prettier](https://prettier.io/) to lint the code

Once those dependencies are installed you can configure each part of the project.

The backend lives on the [`/src`](https://github.com/decentraland/agora/tree/master/src) folder and the front on the [`/webapp`](https://github.com/decentraland/agora/tree/master/webapp) folder.

Keep in mind that both sides use [`dotenv`](https://github.com/motdotla/dotenv) via [decentraland-commons](https://github.com/decentraland/commons) to configure the environment. As such, you'll need to create your own `.env` files, following the `.env.example`s located on each folder.

First of all, you'll need to run [`npm install`](https://docs.npmjs.com/cli/install) on both directories. Once that's done, you can move to configuring each part:

### Back-end

* **Creating the DB user**<br /> Create a PostgreSQL named agora. You can do it running `$ createuser agora` on the terminal or by running the query `CREATE USER agora;`
* **Creating the database**<br /> You'll need to create a `agora` database. You can do it running `$ createdb -O agora agora` on the terminal or by running the query `CREATE DATABASE agora OWNER agora;`.
* **Adding the .env files**<br /> Create a `.env` file on the [`/src`](https://github.com/decentraland/agora/tree/master/src) folder and fill it following the `.env.example` file found there. You can skip most variables as they have a default value. There are some notable exceptions like `CONNECTION_STRING` which might look something like `CONNECTION_STRING="postgres://localhost:5432/agora"`
* **Migrate the database**<br /> Once you have your database you can go ahead and run the database migrations. To do it, simply run `npm run migrate up`. We use [node-pg-migrate](https://github.com/salsita/node-pg-migrate) behind the scenes and every argument after `migrate` will be forwarded to it. You environment will be picked up automatically from the `/src/.env` file, but you can override the `CONNECTION_STRING` by explicitly adding it like this `CONNECTION_STRING='' npm run migrate up`
* **Running the initialize script**<br /> Just run `npm run init-db`.
* **Running an Ethereum node**<br /> If you want to be able to get data from the Ethereum blockchain, you'll need to have a node running on `http://localhost:8545`. You can use [Parity](https://www.parity.io/), [geth](https://github.com/ethereum/go-ethereum/wiki/geth), etc.
* **Running the server**<br /> To run the server just run `npm start` on the repo root directory.
* **Run watchers**<br /> If you want to keep your database up-to-date with the blockchain, you need to run this watcher: `npm run monitor-balances`. Keep in mind that the address you use for each contract will determine the network. For more information in event watching, check [here](https://github.com/decentraland/agora/blob/master/scripts/monitorBalances.ts).

### Front-end

* **Adding the .env files**<br /> Create an `.env` file on the [`/webapp`](https://github.com/decentraland/agora/tree/master/webapp) folder and fill it following the `.env.example` file found there. You will need to specify `NODE_PATH` to be `src/`, `REACT_APP_API_URL` to be `http://localhost:5000` (unless you changed the default server configuration, if so point to the right `host:port`) and `REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS` to Ropsten's MANAToken address: `0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb`.
* **Running the front-end**<br /> You will need to first have the server running (see above). After that just jump into the webapp folder `$ cd webapp` and start the local development `$ npm start`

## Migrations

To keep your database up to date, you'll need to run `npm run migrate up` each time a new migration is introduced. Your database version lives on the `pgmigrations`. Check [node-pg-migrate](https://github.com/salsita/node-pg-migrate) for more info.

## Seed

If you need some test data to test the marketplace, you can use the seed for quick features. Run `npm run seed generate MODEL_NAME -- --amount NUMBER`

## Translate

You can translate automatically from English to the other locales by running the command `npm run translate`, this command will compare all the other locales to `en.json` and if it finds any missing translation it will use Google Translate to add it to the corresponding locale.
