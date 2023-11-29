import { useEffect, useState } from "react";
import "../App.css";
import { ClientTableRow, ClientTableJsonObject, getClientTable } from "../DataObjects/ClientTableInterface";
import { INIT_CLIENT_DATA } from "../DataConstants/ClientTableConstants";




export default function Home() {

  const [tableData, setTableData] = useState<ClientTableRow[]>([INIT_CLIENT_DATA]);
  const [modalClientData, setmodalClientData] = useState<ClientTableRow>(INIT_CLIENT_DATA);
  const [isModalActive, setIsModalActive] = useState<Boolean>(false);


  //A function that supports the creation of the client table.
  function setClientTable() {
    try {
      getClientTable().then(
        function (response: any) {
          let clientTableArray: ClientTableRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: ClientTableJsonObject) => {
            clientTableArray.push({
              abc_client_id: (element.abc_client_id ? element.abc_client_id : null),
              ClientName: (element.client_name ? element.client_name : ""),
              company_address: (element.company_address ? element.company_address : null),
              AddressState: (element.state ? element.state : ""),
              InventoryCount: (element.num_of_inventories ? element.num_of_inventories : null),
              ContactCount: (element.num_of_contacts ? element.num_of_contacts : null)
            });
          });


          //Overwrite the table data.
          setTableData(clientTableArray);
        },
        (error) => {
          console.log(error)
        }
      );
    } catch { }
  }

  function toggleModal() {
    setIsModalActive(!isModalActive);
  }

  function showModal(key: number) {
    let clientRow: ClientTableRow = tableData.at(key);
    setmodalClientData(clientRow);
    toggleModal();
  }


  const Modal = ({ closeModal, modalState }: { closeModal: any, modalState: boolean }) => {
    if (!modalState) {
      return null;
    }

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <div className="modal-card-head is-radiusless">
            <p className="modal-card-title">Client Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Number: </label>
              <p className="mb-3">{(modalClientData.abc_client_id ? modalClientData.abc_client_id.toString() : "")}</p>
              {modalClientData.ClientName &&
                <>
                  <label className="has-text-weight-medium">Client Name: </label>
                  <p>{(modalClientData.ClientName ? modalClientData.ClientName : "")}</p>
                </>
              }
            </div>
            <div className="column">
              {modalClientData.AddressState &&
                <>
                  <label className="has-text-weight-medium">State: </label>
                  <p className="mb-3">{(modalClientData.AddressState ? modalClientData.AddressState : "")}</p>
                </>
              }
              {modalClientData.InventoryCount &&
                <>
                  <label className="has-text-weight-medium">Number of Inventories: </label>
                  <p className="mb-3">{(modalClientData.InventoryCount ? modalClientData.InventoryCount.toString() : "")}</p>
                </>
              }
              {modalClientData.ContactCount &&
                <>
                  <label className="has-text-weight-medium">Number of Contacts: </label>
                  <p>{(modalClientData.ContactCount ? modalClientData.ContactCount.toString() : "")}</p>
                </>
              }
            </div>
          </section>
        </div>
      </div>
    );
  }


  //The useEffect is a function that runs whenever the set data changes or when loading the page.
  useEffect(() => {
    setClientTable();
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="is-size-2 pb-6 has-text-weight-medium">Client List</h2>
        <div className="box columns is-centered">
          <div className="column is-12 px-0 py-0">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client Name</th>
                  <th>State</th>
                  <th>Number of Inventories</th>
                  <th>Number of Contacts</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) =>
                  <tr onClick={() => showModal(i)} className="row-click" key={(row.abc_client_id ? row.abc_client_id.toString() : "")}>
                    <td>{(row.abc_client_id ? row.abc_client_id.toString() : "")}</td>
                    <td>{(row.ClientName ? row.ClientName : "")}</td>
                    <td>{(row.AddressState ? row.AddressState : "")}</td>
                    <td>{(row.InventoryCount ? row.InventoryCount.toString() : "")}</td>
                    <td>{(row.ContactCount ? row.ContactCount.toString() : "")}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Modal
              closeModal={toggleModal}
              modalState={isModalActive.valueOf()}
            />
          </div>
        </div>
      </div>
    </>
  );
}