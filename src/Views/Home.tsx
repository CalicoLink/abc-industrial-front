import { useEffect, useState } from "react";
import "../App.css";
import { INIT_INVENTORY_DATA } from "../DataConstants/InventoryTableConstants";
import { InventoryTableJsonObject, InventoryTableRow, getInventoryTable } from "../DataObjects/InventoryTableInterface";
import { ResourceTableJsonObject, ResourceTableRow, getResourceTable } from "../DataObjects/ResourceTableInterface";
import { INIT_RESOURCE_DATA } from "../DataConstants/ResourceTableConstants";

export default function Home() {

  const [data, setData] = useState([])
  const [inventoryData, setInventoryData] = useState<InventoryTableRow[]>([INIT_INVENTORY_DATA]);
  const [resourceData, setResourceData] = useState<ResourceTableRow[]>([INIT_RESOURCE_DATA]);
  const [modalClientData, setmodalClientData] = useState({
    id: 0,
    name: "",
    inventory_name: "",
    current_capacity: 0,
    max_item_capacity: 0,
  });
  const [isModalActive, setIsModalActive] = useState<Boolean>(false);

  //A function that supports the creation of the client table.
  function setClientTable() {
    try {
      getInventoryTable().then(
        function (response: any) {
          let resourceTableArray: InventoryTableRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: InventoryTableJsonObject) => {
            resourceTableArray.push({
              inventory_id: (element.inventory_id ? element.inventory_id : null),
              inventory_name: (element.inventory_name ? element.inventory_name : ""),
              abc_client: (element.abc_client ? element.abc_client : null),
              storage_type: (element.storage_type ? element.storage_type : ""),
              max_item_capacity: (element.max_item_capacity ? element.max_item_capacity : null),
              address: (element.address ? element.address : null)
            });
          });

          //Overwrite the table data.
          setInventoryData(resourceTableArray);
        },
        (error) => {
          console.log(error)
        }
      );
    } catch { }

    try {
      getResourceTable().then(
        function (response: any) {
          let resourceTableArray: ResourceTableRow[] = [];

          //Define the output of my objects to the array.
          response.data.forEach((element: ResourceTableJsonObject) => {
            resourceTableArray.push({
              abc_resource_id: (element.abc_resource_id ? element.abc_resource_id : null),
              inventory: (element.inventory ? element.inventory : -1),
              resource_type: (element.resource_type ? element.resource_type : null),
              resource_name: (element.resource_name ? element.resource_name : ""),
              max_number_of_resources: (element.max_number_of_resources ? element.max_number_of_resources : null),
              current_number_of_resources: (element.current_number_of_resources ? element.current_number_of_resources : null)
            });
          });

          //Overwrite the table data.
          setResourceData(resourceTableArray);
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
    console.log(key)
    let clientRow = data.find(el => el.id === key);
    console.log(clientRow)
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
            <p className="modal-card-title">Inventory Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Number: </label>
              <p className="mb-3">{(modalClientData.id ? modalClientData.id.toString() : "")}</p>
              {modalClientData.id &&
                <>
                  <label className="has-text-weight-medium">Client Name: </label>
                  <p>{(modalClientData.name ? modalClientData.name : "")}</p>
                </>
              }
            </div>
            <div className="column">
              {modalClientData.inventory_name &&
                <>
                  <label className="has-text-weight-medium">Inventory Name: </label>
                  <p className="mb-3">{(modalClientData.inventory_name ? modalClientData.inventory_name : "")}</p>
                </>
              }
              {modalClientData.current_capacity &&
                <>
                  <label className="has-text-weight-medium">Current Capacity: </label>
                  <p className="mb-3">{(modalClientData.current_capacity ? modalClientData.current_capacity.toString() + "%": "")}</p>
                </>
              }
              {modalClientData.max_item_capacity &&
                <>
                  <label className="has-text-weight-medium">Max Item Capacity: </label>
                  <p>{(modalClientData.max_item_capacity ? modalClientData.max_item_capacity.toString() : "")}</p>
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
    const result = inventoryData.map(inventory => {
      let currentCapacity = 0;

      resourceData.forEach(resource => {
        if (resource.inventory === inventory.inventory_id) {
          currentCapacity += resource.current_number_of_resources as number;
        }
      });

      let capacityPercentage = currentCapacity / (inventory.max_item_capacity as number) * 100;

      return {
        id: inventory.inventory_id,
        name: inventory.abc_client.client_name,
        inventory_name: inventory.inventory_name,
        current_capacity: capacityPercentage,
        max_item_capacity: inventory.max_item_capacity,
      }
    });

    setData(result);

  }, [inventoryData, resourceData]);

  return (
    <>
      <div className="container">
        <h2 className="is-size-3 pb-5 has-text-weight-medium">Inventories Under 40% of Capacity</h2>
        <div className="box columns is-centered">
          <div className="column is-12 px-0 py-0">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Client</th>
                  <th>Inventory</th>
                  <th>Current Capacity</th>
                  <th>Max capacity</th>
                </tr>
              </thead>
              <tbody>
                {data.filter(el => el.current_capacity <= 40).map((row) =>
                  <tr
                    onClick={() => showModal(row.id)}
                    className="row-click"
                    key={(row.id)}
                    id={(row.id)}
                  >
                    <td>{(row.id)}</td>
                    <td>{(row.name)}</td>
                    <td>{(row.inventory_name)}</td>
                    <td>{(row.current_capacity)}%</td>
                    <td>{(row.max_item_capacity)}</td>
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
