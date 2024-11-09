import { sqlite as $, mysql, postgres, column, table, Table, Watch, SnakeCaseStrategy } from "litdb"

@table() class Product {
    @column("TEXT", { primaryKey: true, alias:'sku' }) id = ''
    @column("TEXT", { required: true}) name = ''
    @column('MONEY') cost = 0.0
}
@table() class Contact {
    @column('INTEGER', { autoIncrement:true }) id = 0
    @column('TEXT') name = ''
    @column('TEXT', { required: true, index:true, unique:true }) email = ''
    @column('DATETIME', { defaultValue:'CURRENT_TIMESTAMP' }) createdAt = new Date()
}
@table() class Order {
    @column('INTEGER', { autoIncrement:true }) id = 0
    @column('INTEGER', { required:true }) contactId = 0
    @column('MONEY') total = 0.0
    @column('DATETIME', { defaultValue:'CURRENT_TIMESTAMP' }) createdAt = new Date()
}

Watch(() => {

    const sql = {
        product: $.schema.createTable(Product),
        contact: $.schema.createTable(Contact),
        order:   $.schema.createTable(Order),
    }

    const q = $.from(Product)
        .select(p => $`${p.id}, ${p.name}`)


    return { ...sql, q }

})