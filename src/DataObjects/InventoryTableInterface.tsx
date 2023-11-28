import axios from "axios";

export interface InventoryTableRow {
    inventory_id: Number,
    inventory_name: String,
    abc_client: Number,
    storage_type: String,
    max_item_capacity: Number,
    address: String,
}


export interface InventoryTableJsonObject {
    inventory_id: Number,
    inventory_name: String,
    abc_client: Number,
    storage_type: String,
    max_item_capacity: Number,
    address: String,
}


export async function getInventoryTable() {
    const response = await axios.get(
      'http://localhost:8000/client-inventory/',
      {}
    );

    return response;
}