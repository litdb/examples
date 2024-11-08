import { sqlite as $, SnakeCaseStrategy, Table } from "litdb"
import { Contact, Order } from "./models"

const id = 1
// $.dialect.strategy = new SnakeCaseStrategy()
$.from(Contact)
    .join(Order, { on:(c,o) => $`${c.id} = ${o.contactId}`})
    .where((c, o) => $`${c.id} = ${id} AND ${o.total} > ${1000}`)
    .groupBy((c,o) => $`${c.age}, ${o.freightId}`)
    .select((c,o) => $`${c.name}, ${o.total}`)
    .log()

$.from(Contact)
    .join(Order, { on:(c,o) => $`${c.id} = ${o.contactId}`})
    .where((c, o) => $`${c.id} = ${id} AND ${o.total} > 1000`)
    .and(c => $`${c.name} = ${'John'}`)
    .log()



// $.from(Contact)
//     .join(Order, { on:(c,o) => $`${c.id} = ${o.contactId}`})
//     .where(c => $`${c.id} = ${id}`)
//     .select(c => $`${c.id}, ${c.name}`)
//     .log()
