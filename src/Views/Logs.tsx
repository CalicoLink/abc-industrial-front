import { useEffect, useState } from "react";
import "../App.css";
import { INIT_RESULT_DATA } from "../DataConstants/LogsTableConstants";
import { LogsTableJsonObject, LogsTableRow, getLogsTable } from "../DataObjects/LogsTableInterface";




export default function Logs() {
    
  const [tableData, setTableData] = useState<LogsTableRow[]>([INIT_RESULT_DATA]);
  const [modalClientData, setmodalClientData] = useState<LogsTableRow>(INIT_RESULT_DATA);
  const [isModalActive, setIsModalActive] = useState<Boolean>(false);
console.log(3)

  //A function that supports the creation of the client table.
  function setLogsTable(){
    try{
        getLogsTable().then(
        function (response: any){
          let logsTableArray: LogsTableRow[] = [];
          
          //Define the output of my objects to the array.
          response.data.forEach((element: LogsTableJsonObject) => {
            logsTableArray.push({
                accessLogId: (element.access_log_id ? element.access_log_id : -1),
                username: (element.username ? element.username : ""),
                action: (element.action ? element.action : ""),
                tableName: (element.table_name ? element.table_name : ""),
                fieldName: (element.field_name ? element.field_name : ""),
                screenName: (element.screen_name ? element.screen_name : ""),
                logTime: (element.log_time ? element.log_time : new Date())
            });
          });


          //Overwrite the table data.
          setTableData(logsTableArray);
        },
        (error) => {
          console.log(error)
        }
      );
    } catch{}
  } 
  
  function toggleModal() {
    setIsModalActive(!isModalActive);
  }

  function showModal(key: number){
    let clientRow: LogsTableRow = tableData.at(key);
    setmodalClientData(clientRow);
    toggleModal();
  }


//   const Modal = ({ closeModal, modalState }: { closeModal: any, modalState: boolean }) => {
//     if(!modalState) {
//       return null;
//     }
    
//     return(
//       <div className="modal is-active">
//         <div className="modal-background"></div>
//         <div className="modal-card">
//           <div className="modal-card-head is-radiusless">
//             <p className="modal-card-title">Client Information</p>
//             <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
//           </div>
//           <section className="modal-card-body columns">
//             <div className="column">
//               <label className="has-text-weight-medium">Number: </label>
//               <p className="mb-3">{(modalClientData.id ? modalClientData.id.toString() : "")}</p>
//               { modalClientData.ClientName &&
//                 <>
//                   <label className="has-text-weight-medium">Client Name: </label>
//                   <p>{(modalClientData.ClientName ? modalClientData.ClientName : "")}</p>
//                 </>
//               }
//             </div>
//             <div className="column">
//               { modalClientData.AddressState &&
//                 <>
//                   <label className="has-text-weight-medium">State: </label>
//                   <p className="mb-3">{(modalClientData.AddressState ? modalClientData.AddressState : "")}</p>
//                 </>
//               }
//               { modalClientData.InventoryCount &&
//                 <>
//                   <label className="has-text-weight-medium">Number of Inventories: </label>
//                   <p className="mb-3">{(modalClientData.InventoryCount ? modalClientData.InventoryCount.toString() : "")}</p>
//                 </>
//               }
//               { modalClientData.ContactCount &&
//                 <>
//                   <label className="has-text-weight-medium">Number of Contacts: </label>
//                   <p>{(modalClientData.ContactCount ? modalClientData.ContactCount.toString() : "")}</p>
//                 </>
//               }
//             </div>
//           </section>
//         </div>
//       </div>
//     );
//   }


  //The useEffect is a function that runs whenever the set data changes or when loading the page.
  useEffect(() => {
    setLogsTable();
    console.log(23234)

    }, []);
  
  return (
    <>
      <h2 className="is-size-2 pb-6 has-text-weight-medium">Access Logs</h2>
      <div className="box columns is-centered is-radiusless">
        <div className="column is-12 px-0 py-0"> 
            <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Action</th>
                    <th>Table Name</th>
                    <th>Field Name</th>
                    <th>Screen Name</th>
                    <th>Date and Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) =>
                    <tr id={(row.accessLogId ? row.accessLogId.toString() : "")}>
                      <td>{(row.accessLogId ? row.accessLogId.toString() : "")}</td>
                      <td>{(row.username ? row.username : "")}</td>
                      <td>{(row.action ? row.action : "")}</td>
                      <td>{(row.tableName ? row.tableName : "")}</td>
                      <td>{(row.fieldName ? row.fieldName : "")}</td>
                      <td>{(row.screenName ? row.screenName : "")}</td>
                      <td>{(row.logTime ? row.logTime.toString() : "")}</td>
                    </tr> 
                  )}
                </tbody>
            </table>
            {/* <Modal
              closeModal={toggleModal}
              modalState={isModalActive.valueOf()}
            /> */}
        </div>
      </div>
    </>
  );
}