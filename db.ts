import { connect } from "@litdb/bun-sqlite"

export const connection = connect("app.db")
export const { $, async, sync } = connection
