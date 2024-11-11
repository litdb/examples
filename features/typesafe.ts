
import { sqlite as $ } from "litdb"
import { Order } from "./models"

const contactId = 1
$.from(Order)
    .where(o => $`${o.contactId} = ${contactId}`)
    .select(o => $`${o.id}, ${o}`)
