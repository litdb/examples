import { column, sqlite, table, Watch } from "litdb"

@table()
class Contact {
    id = 0
    name = ''
    age = 0
    createdAt = new Date()
}

@table()
export class Order {
    constructor(data?: Partial<Order>) { Object.assign(this, data) }

    @column("INTEGER", { autoIncrement:true })
    id: number = 0

    @column("INTEGER", { required:true, references: { table: [Contact, 'id'] } })
    contactId: number = 0

    @column("INTEGER")
    cost: number = 0

    @column("INTEGER")
    qty: number = 0

    @column("INTEGER")
    total: number = 0
}

@table()
export class OrderItem {
    @column("INTEGER", { autoIncrement:true })
    id: number = 0

    @column("INTEGER", { required:true })
    orderId: number = 0

    @column("TEXT", { required:true })
    name: string = ''

    @column("INTEGER")
    cost: number = 0
}

Watch(() => {
    const $ = sqlite

    const sql = {
        // drop: $.schema.dropTable(Contact),
        create: $.schema.createTable(Contact),
        update: $.schema.update(Contact),
        insert: $.schema.insert(Contact),
        delete: $.schema.delete(Contact),
    }

    return { ...sql }
})