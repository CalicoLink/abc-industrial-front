import axios from "axios";

export interface AddressTableRow {
    address_id: Number,
    state: String,
    address_line_1: String,
    address_line_2: String,
    country: String,
    postal_code: Number,
    city: String
}


export interface AddressTableJsonObject {
    address_id: Number,
    state: String,
    address_line_1: String,
    address_line_2: String,
    country: String,
    postal_code: Number,
    city: String
}


export async function getAddressTable() {
    const response = await axios.get(
      'http://localhost:8000/address/',
      {}
    );

    return response;
}