import { LogsTableRow } from "../DataObjects/LogsTableInterface";

export const INIT_RESULT_DATA: LogsTableRow = {
    accessLogId: -1,
    username: "",
    action: "",
    tableName: "",
    fieldName: "",
    screenName: "",
    logTime: new Date(),
};