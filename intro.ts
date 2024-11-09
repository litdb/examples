import { sqlite as $, mysql, postgres, column, table, Table, Watch, SnakeCaseStrategy } from "litdb"
import { Product, Contact, Order } from "./data"

@table() 
class OrderItem {
    @column('INTEGER', { autoIncrement: true }) 
    id = 0
    @column('INTEGER', { references:{ table: Order, on:["DELETE", "CASCADE"] } }) 
    orderId = 0
    @column('TEXT',    { references: { table: Product }}) 
    sku = ''
    @column('INTEGER') 
    qty = 0
    @column('MONEY',   { required: true, alias: 'orderTotal' })
    total = 0.0
}

Watch(() => {

    const orderItem = $.schema.createTable(OrderItem)

    const hotProducts = ['WIDGET', 'GADGET', 'THING']
    const qHot = $.from(OrderItem)
        .where(i => $`${i.sku} IN (${hotProducts})`)
        .groupBy(i => $`${i.id}`)
        .orderBy(i => $`SUM(${i.qty}) DESC`)
        .select(i => $`${i.id}`)
        .limit(10)

    const q = $.from(Order, 'o')
        .leftJoin(Contact, { on:(o,c) => $`${o.contactId} = ${c.id}`, as:'c' })
        .join(OrderItem, { on:(_,i,o) => $`${i.orderId} = ${o.id}`, as:'i' })
        .leftJoin(Product, { on:(i,p) => $`${i.sku} = ${p.id}`, as:'p' })
        .where((o,c,i,p) => $`${p.cost} > ${100} AND ${o.contactId} IN (${[1,2,3]})`)
        .or((o,c,i) => $`${i.sku} IN (${qHot})`)
        .select((o,c,i,p) => $`${c.name}, ${p.name}, ${i.qty}, ${i.total}, ${o.total}`)
        .orderBy(o => $`${o.total}`)
        .limit(50, 100)

    return { orderItem, qHot, q }
})