import { sqlite as $ } from "litdb"

class Order {
    id = 0
    contactId = 0
    total = 0.0
    createdAt = new Date()
}
class OrderItem {
    id = 0
    orderId = 0
    sku = ''
    qty = 0
    lineTotal = 0.0
}

const q = $.from(Order, 'o')
    .join(OrderItem, { on:(_,i,o) => $`${i.orderId} = ${o.id}`, as:'i' })
    .where((o) => $`${o.total} < ${1000}`)
    .and((_,i) => $`${i.lineTotal} > ${100}`)
    .select((o,i) => $`${o.id}, ${i.qty}, ${i.sku}, ${i.lineTotal}, ${o.total}`)
