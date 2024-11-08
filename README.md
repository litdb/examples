Requires Table class

```ts
import { sqlite, mysql, postgres, Watch } from "litdb"

class Product {
    sku = ''
    name = ''
    cost = 0.0
}

Watch(() => {
    const $ = sqlite

    const sql = {
        drop: $.schema.dropTable(Product),
        create: $.schema.createTable(Product),
    }

    const q = $.from(Product)

    return { ...sql, q }
})
```

ADD UPDATE `@table()`

    sku:  { type:"TEXT" },

[SAVE]

    name: { type:"TEXT", required:true },

[SAVE]

    cost: { type:"MONEY" },

[SAVE]

    insert: $.schema.insert(Product),

[SAVE]

    update: $.schema.update(Product),

[SAVE]

    sku:  { type:"TEXT", primaryKey:true },

[SAVE]

    delete: $.schema.delete(Product),

[SAVE]

```ts
import { sqlite, column, table, Watch } from "litdb"

class Product {
    sku = ''
    name = ''
    cost = 0.0
}

// Fluent Configuration
Table(Product, {
    columns: {
        sku:  { type:"TEXT", primaryKey:true },
        name: { type:"TEXT", required:true },
        cost: { type:"MONEY" },
    }
})

Watch(() => {
    const $ = sqlite

    const sql = {
        drop: $.schema.dropTable(Product),
        create: $.schema.createTable(Product),
        insert: $.schema.insert(Product),
        update: $.schema.update(Product),
        delete: $.schema.delete(Product),
    }

    const q = $.from(Product)

    return { ...sql, q }
})
```

ADD `@table()` and `@column()`

```ts
import { sqlite, column, table, Watch } from "litdb"

class Product {
    sku = ''
    name = ''
    cost = 0.0
}

Watch(() => {
    const $ = sqlite

    // Schema and CRUD Generation
    const sql = {
        drop: $.schema.dropTable(Product),
        create: $.schema.createTable(Product),
        insert: $.schema.insert(Product),
        update: $.schema.update(Product),
        delete: $.schema.delete(Product),
    }

    const q = $.from(Product)

    return { ...sql, q }
})
```

SELECT sku [SAVE], name [SAVE]

    .select(c => $`${c.sku}, ${c.name}`)

Rename sku

    class Product {
        id = ''
        name = ''
        cost = 0.0
    }

Add alias

    id:  { type:"TEXT", primaryKey:true, alias:'sku' },

ADD Table()

    @table() 
    
[SAVE]
    
    class Product {
        @column("TEXT")
        id = ''
    
[SAVE]

        @column("TEXT")
        name = ''
    
[SAVE]

        @column("MONEY")
        cost = 0.0
    }
    

[SAVE]

```ts
import { sqlite, mysql, postgres, column, table, Watch, Table } from "litdb"

    @table() 
    class Product {
        @column("TEXT")
        id = ''

        @column("TEXT")
        name = ''

        @column("MONEY")
        cost = 0.0
    }

Watch(() => {
    const $ = sqlite

    const sql = {
        create: $.schema.createTable(Product),
        insert: $.schema.insert(Product),
        update: $.schema.update(Product),
        delete: $.schema.delete(Product),
    }

    const q = $.from(Product)

    return { ...sql, q }
})
```

Emphasis MONEY data type

Change to mysql

    const $ = mysql

Change to postgres

    const $ = postgres

Add naming strategy

    postgres.dialect.strategy = new SnakeCaseStrategy()
    const $ = postgres

Move alias to import:

    import { sqlite as $, column, table, Watch, Table } from "litdb"

Go back to single create:

    const sql = {
        create: $.schema.createTable(Product),
    }

Add Contact Type

    class Contact {
        id = 0
        name = ''
        email = ''
        createdAt = new Date()
    }

    const sql = {
        create: $.schema.createTable(Product),
        contact:   $.schema.createTable(Contact),
    }

Annotate with table

    // Config using decorators...
    @table() class Contact {
        @column("INTEGER",  { autoIncrement:true }) id = 0
        @column("TEXT",     { required:true }) name = ''
        @column("TEXT",     { required:true, index:true, unique:true }) email = ''
        @column("DATETIME", { defaultValue:"CURRENT_TIMESTAMP" }) createdAt = new Date()
    }

Add Order

    class Order {
        id = 0
        contactId = 0
        total = 0.0
        createdAt = new Date()
    }

    const sql = {
        product: $.schema.createTable(Product),
        contact: $.schema.createTable(Contact),
        order:   $.schema.createTable(Order),
    }

Annotate Order

    @table() class Order {
        @column("INTEGER",  { autoIncrement:true }) id = 0
        @column("INTEGER",  { references:{ table:Contact, on:["DELETE","CASCADE"] } }) contactId = 0
        @column("MONEY")    total = 0.0
        @column("DATETIME", { defaultValue:"CURRENT_TIMESTAMP" }) createdAt = new Date()
    }

Add OrderItem

    class OrderItem {
        id = 0
        orderId = 0
        sku = ''
        qty = 0
        total = 0.0
    }

    const sql = {
        product:   $.schema.createTable(Product),
        contact:   $.schema.createTable(Contact),
        order:     $.schema.createTable(Order),
        orderItem: $.schema.createTable(OrderItem),
    }

Annotate OrderItem

    @table() class OrderItem {
        @column("INTEGER", { autoIncrement:true }) id = 0
        @column("INTEGER", { references:{ table:Order, on:["DELETE","RESTRICT"] } }) orderId = 0
        @column("INTEGER", { references:{ table:Product } }) sku = ''
        @column("INTEGER") qty = 0
        @column("MONEY")   total = 0.0
    }

Add 1 param query

    const q = $.from(OrderItem)
      .where(i => $`${i.orderId} = 1`)
      .select(i => $`${i.id}, ${i.sku}, ${i.total}`)

Convert to param

    const q = $.from(OrderItem)
      .where(i => $`${i.orderId} = ${1}`)
      .select(i => $`${i.id}, ${i.sku}, ${i.total}`)

Add bobbyTables

    const bobbyTables = "Robert'); DROP TABLE Students;--"
    const q = $.from(Product)
      .where(c => $`${c.id} = ${1}`)
      .and(c => $`${c.name} = ${bobbyTables}`)
      .select(c => $`${c.id}, ${c.name}`)

Try use string interpolation:

      .and(c => `${c.name} = ${bobbyTables}`)

Show mysql:

    const $ = mysql

Show mysql:

    const $ = postgres

Add strategy:

    postgres.dialect.strategy = new SnakeCaseStrategy()
    const $ = postgres

Use import alias 

    import { sqlite as $ }

Remove everything:

    postgres.dialect.strategy = new SnakeCaseStrategy()
    const $ = postgres
    --const sql = {}

Remove everything in Watch:

    --clear--

    const q = $.from(Order)
       .log("debug")

Add Contact:

    .leftJoin(Contact, { on:(o,c) => $`${c.id} = ${o.contactId}`})
    .log("debug")

Add OrderItem:

    .join(OrderItem,   { on:(_,i,o) => $`${o.id} = ${i.orderId}`})
    .log("debug")

Add Product:

    .leftJoin(Product, { on:(i,p) => $`${i.sku} = ${p.id}`})
    .log("debug")

Add Where:

    .where((o,c,i,p) => $`${p.cost} >= ${1000} AND ${o.contactId} IN (${[1,2,3]})`)
    .log("debug")

Add Select:

    .select((o,c,i,p) => $`${c.name}, ${o.id}, ${p.name}, ${i.qty}, ${i.total}, ${o.total}`)
    .log("debug")

Hover over (o,c,i,p):

Add Order By:

    .orderBy(o => $`${o.total}`)
    .log("debug")

Add limit:

    .limit(50)

    .limit(50, 100)

Enable Verbose logging:

    .log("verbose")

Add aliases:

    const q = $.from(Order, 'o')

      .leftJoin(Contact, { on:(o,c) => $`${c.id} = ${o.contactId}`, as:'c'})

      .join(OrderItem,   { on:(_,i,o) => $`${o.id} = ${i.orderId}`, as:'i'})

      .leftJoin(Product, { on:(i,p) => $`${i.sku} = ${p.id}`, as:'p' })

Rename i.total:

    .select((o,c,i,p) => $`${c.name}, ${o.id}, ${p.name}, ${i.qty}, ${i.lineTotal}, ${o.total}`)

Add alias to orderTotal:

    @column("MONEY",    { alias:'orderTotal' }) total = 0.0

Remove log + restore sql + Add qHot:

    --.log("verbose")

    const hotProducts = ['WIDGET','GIZMO','GADGET']
    const qHot = $.from(OrderItem)
      .where(i => $`${i.sku} IN (${hotProducts})`)

    return { ...sql, qHot, q }

Add qHot groupBy

    .groupBy(i => $`${i.id}`)

Add qHot orderBy

    .orderBy(i => $`SUM(${i.qty}) DESC`)

Add qHot limit

    .limit(10)

View:

    const hotProducts = ['WIDGET','GIZMO','GADGET']
    const qHot = $.from(OrderItem)
        .where(i => $`${i.sku} IN (${hotProducts})`)
        .groupBy(i => $`${i.id}`)
        .orderBy(i => $`SUM(${i.qty}) DESC`)
        .limit(10)

Add .or qHot

    .where((o,c,i,p) => $`${p.cost} >= ${1000} AND ${o.contactId} IN (${[1,2,3]})`)
    .or((o,c,i) => $`${i.sku} IN (${qHot})`)

Highlight subselect in console

Switch over aliases

import { sqlite, mysql as $, postgres, ...

Welcome message at top:

    // And much more! 
    // Checkout litdb.dev
    // Have fun ;-)


```ts
import { sqlite, column, table, Watch, Table, SnakeCaseStrategy, mysql, postgres } from "../src"

@table() class Product {
    @column("INTEGER", { autoIncrement:true, alias:'sku' }) id = ''
    @column("TEXT",    { required:true }) name = ''
    @column("MONEY",   { required:true }) cost = 0.0
}
@table() class Contact {
    @column("INTEGER",  { autoIncrement:true }) id = 0
    @column("TEXT",     { required:true }) name = ''
    @column("TEXT",     { required:true, index:true, unique:true }) email = ''
    @column("DATETIME", { defaultValue:"CURRENT_TIMESTAMP" }) createdAt = new Date()
}
@table() class Order {
    @column("INTEGER",  { autoIncrement:true }) id = 0
    @column("INTEGER",  { references:{ table:Contact, on:["DELETE","CASCADE"] } }) contactId = 0
    @column("MONEY")    total = 0.0
    @column("DATETIME", { defaultValue:"CURRENT_TIMESTAMP" }) createdAt = new Date()
}
@table() class OrderItem {
    @column("INTEGER", { autoIncrement:true }) id = 0
    @column("INTEGER", { references:{ table:Order, on:["DELETE","RESTRICT"] } }) orderId = 0
    @column("INTEGER", { references:{ table:Product } }) sku = ''
    @column("INTEGER") qty = 0
    @column("MONEY")   total = 0.0
}

Watch(() => {

  const hotProducts = ['WIDGET','GIZMO','GADGET']
  const qHot = $.from(OrderItem)
      .where(i => $`${i.sku} IN (${hotProducts})`)
      .groupBy(i => $`${i.id}`)
      .orderBy(i => $`SUM(${i.qty}) DESC`)
      .limit(10)

  const q = $.from(Order)
    .leftJoin(Contact, { on:(o,c) => $`${c.id} = ${o.contactId}`})
    .join(OrderItem,   { on:(_,i,o) => $`${o.id} = ${i.orderId}`})
    .leftJoin(Product, { on:(i,p) => $`${i.sku} = ${p.id}`})
    .where((o,c,i,p) => $`${p.cost} >= ${1000} AND ${o.contactId} IN (${[1,2,3]})`)
    .or((o,c,i) => $`${i.sku} IN (${qHot})`)
    .select((o,c,i,p) => $`${c.name}, ${o.id}, ${p.name}, ${i.qty}, ${i.lineTotal}, ${o.total}`)
    .log("debug")

    return { qHot, q }
})
```
