import axios from "axios";

export interface ResourceTableRow {
    abc_resource_id: Number,
    inventory: Number,
    resource_type: Number,
    resource_name: String,
    max_number_of_resources: Number,
    current_number_of_resources: Number,
}


export interface ResourceTableJsonObject {
    abc_resource_id: Number,
    inventory: Number,
    resource_type: Number,
    resource_name: String,
    max_number_of_resources: Number,
    current_number_of_resources: Number,
}


export async function getResourceTable() {
    const response = await axios.get(
        'http://localhost:8000/resources/',
        {}
    );

    return response;
}