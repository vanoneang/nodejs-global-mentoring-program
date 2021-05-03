# nodejs-global-mentoring-program

## Modules

- Module2: Basics. Node.js fundamental theory
- Module3: In-memory CRUD REST service with validation
- Module4: PostgreSQL and layered architecture

## db
create migration file

```
knex migrate:make user
```

execute migration file

```
knex migrate:latest
```

rollback
```
knex migrate:rollback
```

create seed file

```
knex seed:make user
```

execute seed file

```
knex seed:run --specific=users.js
```

Perform database:

```
sudo su postgres 
psql -l
psql nodejs-mentoring
nodejs-mentoring=# \dt
nodejs-mentoring=# \d users
```