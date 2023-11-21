import axios from "axios";

export interface LogsTableRow {
    accessLogId: Number,
    username: String,
    action: String,
    tableName: String,
    fieldName: String,
    screenName: String,
    logTime: Date,
}


export interface LogsTableJsonObject {
    access_log_id: Number,
    username: String,
    action: String,
    table_name: String,
    field_name: String,
    screen_name: String,
    log_time: Date
}


export async function getLogsTable() {
    const response = await axios.get(
      'http://localhost:8000/logs/',
      {}
    );

    return response;
}