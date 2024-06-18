## Installation

Install the API with npm or yarn

```bash
  yarn
  npm run install
```

Run the project with: 
```bash
  yarn dev
  npm run dev
  ```

Generation of the database: 
```bash
npx prisma migrate dev --name init
```

Show the database in the browser with prisma:
```bash
npx prisma studio
```

Generation of the type of the database tables
```bash
npx prisma generate 
```

For prisma, add .env in you project folder and add it: 
```bash
DATABASE_URL="mysql://root:root@localhost:3306/staking_web2"
```


On /api-docs You can retrieve the docs
Update the file swagger.ts with you PATH of the routes to update it

