
import { sqlite as $ } from "litdb"
import { Contact } from "./models"

const bobbyTables = ""
$.from(Contact)
    .where(c => $`${c.id} = ${1}`)
    .select(c => $`${c.id}, ${c.name}, ${c.email}`)
