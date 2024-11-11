import { Table, type Constructor } from "litdb"

export function configure(...tables:Constructor<any>[]) {
    for (const cls of tables) {
        if (cls.name == 'Order') {
            Table(cls, { 
                columns: {
                    id: { type:'INTEGER', autoIncrement:true },
                    contactId: { type:'INTEGER' },
                    total: { type:'MONEY' },
                    createdAt: { type:'DATETIME', defaultValue:'CURRENT_TIMESTAMP' }      
                }
            })
        } else if (cls.name == 'OrderItem') {
            Table(cls, { 
                columns: {
                    id: { type:'INTEGER', autoIncrement:true },
                    orderId: { type:'INTEGER' },
                    sku: { type:'TEXT' },
                    qty: { type:'INTEGER' },
                    total: { type:'MONEY' }
                }
            })
        }
    }
}
