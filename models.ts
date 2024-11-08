import { column, table, DefaultValues } from "litdb"

@table()
export class Contact {
    constructor(data?: Partial<Contact>) { Object.assign(this, data) }

    @column("INTEGER", { autoIncrement: true })
    id = 0
    
    @column("TEXT", { required: true })
    name = ''
    
    @column("INTEGER")
    age?: number
    
    @column("DATETIME", { defaultValue:DefaultValues.NOW })
    createdAt = new Date()
}

@table()
export class Order {
    constructor(data?: Partial<Order>) { Object.assign(this, data) }

    @column("INTEGER", { autoIncrement:true })
    id: number = 0

    @column("INTEGER", { required:true })
    contactId: number = 0

    @column("INTEGER")
    freightId?: number

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
    lineItem: string = ''

    @column("INTEGER")
    qty: number = 0

    @column("INTEGER")
    cost: number = 0
}

@table()
export class Freight {
    @column("INTEGER", { autoIncrement:true })
    id: number = 0

    @column("TEXT", { required:true })
    name: string = ''
}
