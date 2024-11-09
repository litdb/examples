import { sqlite, Table, Watch } from "litdb"

class Product {
    sku = ''
    name = ''
    cost = 0.0
}

Table(Product, {
    columns: {
        sku: { type:'TEXT', primaryKey: true },
        name: { type:'TEXT', required: true },
        cost: { type:'MONEY' },
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