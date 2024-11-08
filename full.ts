import { sqlite as $, mysql, postgres, column, table, Watch, Table, SnakeCaseStrategy } from "../src"

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
    @column("MONEY",    { alias:'orderTotal' }) total = 0.0
    @column("DATETIME", { defaultValue:"CURRENT_TIMESTAMP" }) createdAt = new Date()
}
@table() class OrderItem {
    @column("INTEGER", { autoIncrement:true }) id = 0
    @column("INTEGER", { references:{ table:Order, on:["DELETE","RESTRICT"] } }) orderId = 0
    @column("INTEGER", { references:{ table:Product } }) sku = ''
    @column("INTEGER") qty = 0
    @column("MONEY")   lineTotal = 0.0
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
