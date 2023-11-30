import { useEffect, useState } from "react";
import "../App.css";
import { ClientTableRow, ClientTableJsonObject, getClientTable } from "../DataObjects/ClientTableInterface";
import { InventoryTableJsonObject, InventoryTableRow, getInventoryTable } from "../DataObjects/InventoryTableInterface";
import { AddressTableJsonObject, AddressTableRow, getAddressTable } from "../DataObjects/AddressTableInterface";
import { INIT_CLIENT_DATA } from "../DataConstants/ClientTableConstants";
import { INIT_ADDRESS_DATA } from "../DataConstants/AddressTableConstants";
import { INIT_INVENTORY_DATA } from "../DataConstants/InventoryTableConstants";



export default function Clients() {

  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState<ClientTableRow[]>([INIT_CLIENT_DATA]);
  const [addressData, setAddressData] = useState<AddressTableRow[]>([INIT_ADDRESS_DATA]);
  const [inventoryData, setInventoryData] = useState<InventoryTableRow[]>([INIT_INVENTORY_DATA]);
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
          setClientData(clientTableArray);
        },
        (error) => {
          console.log(error)
        }
      );
    } catch { }

    try {
      getAddressTable().then(
        function (response: any) {
          let addressTableArray: AddressTableRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: AddressTableJsonObject) => {
            addressTableArray.push({
              address_id: (element.address_id ? element.address_id : null),
              state: (element.state ? element.state : ""),
              address_line_1: (element.address_line_1 ? element.address_line_1 : ""),
              address_line_2: (element.address_line_2 ? element.address_line_2 : ""),
              country: (element.country ? element.country : ""),
              postal_code: (element.postal_code ? element.postal_code : null),
              city: (element.city ? element.city : ""),
            });
          });


          //Overwrite the table data.
          setAddressData(addressTableArray);
        },
        (error) => {
          console.log(error)
        }
      );
    } catch { }

    try {
      getInventoryTable().then(
        function (response: any) {
          let inventoryTableArray: InventoryTableRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: InventoryTableJsonObject) => {
            inventoryTableArray.push({
              inventory_id: (element.inventory_id ? element.inventory_id : null),
              inventory_name: (element.inventory_name ? element.inventory_name : ""),
              abc_client: (element.abc_client ? element.abc_client : null),
              storage_type: (element.storage_type ? element.storage_type : ""),
              max_item_capacity: (element.max_item_capacity ? element.max_item_capacity : null),
              address: (element.address ? element.address : ""),
            });
          });


          //Overwrite the table data.
          setInventoryData(inventoryTableArray);
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
    let clientRow: ClientTableRow = clientData.at(key);
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

  useEffect(() => {
    function countInventories(clientId: Number) {
      return inventoryData.filter(inventory => inventory.abc_client.abc_client_id === clientId).length;
    }

    const result = clientData.map(client => {
      const { ClientName, abc_client_id, company_address } = client;
      const { state } = company_address
      const numberOfInventories = countInventories(abc_client_id);

      return {
        abc_client_id,
        ClientName,
        state,
        numberOfInventories,
      };
    });

    setData(result)
  }, [clientData, addressData, inventoryData]);

  return (
    <>
      <div className="container">
        <h2 className="is-size-3 pb-5 has-text-weight-medium has-text-black">Client List</h2>
        <div className="box columns is-centered">
          <div className="column is-12 px-0 py-0">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client Name</th>
                  <th>State</th>
                  <th>Number of Inventories</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) =>
                  <tr className="row-click" onClick={() => showModal(i)} key={(row.abc_client_id ? row.abc_client_id.toString() : "")}>
                    <td>{(row.abc_client_id ? row.abc_client_id.toString() : "")}</td>
                    <td>{(row.ClientName ? row.ClientName : "")}</td>
                    <td>{(row.state ? row.state : "")}</td>
                    <td>{(row.numberOfInventories ? row.numberOfInventories.toString() : 0)}</td>
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