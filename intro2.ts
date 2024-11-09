import { sqlite, column, table, Table, Watch } from "litdb"

// Declarative schema
@table()
class Product {
    @column("TEXT", { primaryKey: true, alias:'sku' })
    id = ''
    @column("TEXT", { required: true})
    name = ''
    @column('MONEY')
    cost = 0.0
}

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
        .select(p => $`${p.id}, ${p.name}`)


    return { ...sql, q }

})