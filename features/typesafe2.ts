
import { sqlite as $ } from "litdb"
import { Order, Contact, OrderItem } from "./models"

const contactEmail = "john@email.org"
const q = $.from(Order, 'o')
    // .leftJoin(Contact, { on:(o,c) => $`${o.contactId} = ${c.id}`, as:'c' })
    .join(OrderItem, { on:(_,i,o) => $`${i.orderId} = ${o.id}`, as:'i' })
    .where((o,c) => $`${c.email} = ${contactEmail}`)
    .and(o => $`${o.total} >= ${1000}`)
    .select((o,c,i) => $`${c.name}, ${i.sku}, ${i.qty}, ${i.total}, ${o.total}`)
