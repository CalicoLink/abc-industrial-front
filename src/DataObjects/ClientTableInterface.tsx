import axios from "axios";

export interface ClientTableRow {
    abc_client_id: Number,
    ClientName: String,
    AddressState: String,
    company_address: {
        state: String
    },
    InventoryCount: Number,
    ContactCount: Number
}


export interface ClientTableJsonObject {
    abc_client_id: Number,
    client_name: String,
    state: String,
    company_address: {
        state: String
    },
    num_of_inventories: Number,
    num_of_contacts: Number
}


export async function getClientTable() {
    const response = await axios.get(
        'http://localhost:8000/clients/',
        {}
    );

    return response;
}