Front-end em: https://github.com/ptrkc/forms-react

- Primeiro, crie a database que você vai utilizar. O projeto está definido para utilizar uma chamada `forms`:

```bash
psql -c "CREATE DATABASE forms;"
```

- verifique o arquivo `/db/data-source.ts` e confirme que as informações de `host` a `database` estão corretas
- depois na raiz do projeto

```bash
cp .env.example .env
npm i
migration:run
npm run start:dev
```
