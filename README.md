# mrvl
Browse and manage your favourite Marvel Comics.

## Installation

* [Node.js](https://nodejs.org/en/) 
* [npm](https://www.npmjs.com/get-npm) 
* [Yarn](https://www.yarnpkg.com)

```bash
  npm i -g yarn
```


## Usage

```bash
  cp .env.example .env
  yarn install
  yarn dev
  # defaults:
  #   server: http://localhost:3000
  #   client: http://localhost:5000
  # see ./package.json and client/package.json for change
```

## Misc

Each Marvel API key ([see environment variables](https://raw.githubusercontent.com/kkamara/mrvl/main/.env.example)) has a request limit of 3000/day.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)
