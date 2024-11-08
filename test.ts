import { sqlite, column, table, Watch, Table, SnakeCaseStrategy } from "../src"

class Product {
    sku = ''
    name = ''
    cost = 0.0
}
Table(Product, {
    columns: {
        sku: { type:"TEXT", primaryKey:true },
        name: { type:"TEXT", required:true },
        cost: { type:"MONEY" },
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

    const skus = ['WIDGET','GIZMO']
    const ids = [1,2,3]
    const q = $.from(Product)
        .where(c => $`${c.sku} IN (${skus}) AND ${c.cost} IN (${ids})`)
        .select(c => $`${c.sku}, ${c.name}`)

    return { ...sql, q }
})
