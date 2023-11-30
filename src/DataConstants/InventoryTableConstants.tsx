import { InventoryTableRow } from '../DataObjects/InventoryTableInterface';

export const INIT_INVENTORY_DATA: InventoryTableRow = {
    inventory_id: -1,
    inventory_name: "",
    abc_client: {
        abc_client_id: -1,
        client_name: "",
        state: "",
        company_address: -1,
        num_of_inventories: -1,
        num_of_contacts: -1
    },
    storage_type: "",
    max_item_capacity: -1,
    address: "",
};