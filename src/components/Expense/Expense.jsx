import { useState, useEffect } from "react";
import axios from "axios";

const Expense = () => {
  const [allItems, setAllItems] = useState([]);

  const [item, setItem] = useState(-1);
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState();
  const [weight_unit, setWeightUnit] = useState("");
  const [date, setDate] = useState();

  const get_all_items = () => {
    axios
      .get("http://127.0.0.1:8000/item/list_items")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setAllItems(response.data["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    get_all_items();
  }, []);

  return (
    <>
      <div>Create New Expense</div>
      <form>
        <label htmlFor="item">Choose Item: </label>
        <select
          name="item"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        >
          {allItems.map((single_item, index) => {
            // if (index == 0) return <option value="">No Item</option>;
            return (
              <option key={single_item.id} value={single_item.id}>
                {single_item.name}
              </option>
            );
          })}
        </select>
        <br />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <br />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <br />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeightUnit(e.target.value)}
          placeholder="Weight"
        />
        <br />
        <label htmlFor="unit">Choose Unit: </label>
        <select name="unit" id="unit" value={weight_unit}>
          <option value="">No unit</option>
          <option value="kg">kg (kilogram)</option>
          <option value="g">g (gram)</option>
          <option value="ml">ml (milli-liter)</option>
        </select>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
      </form>
      <hr />
      <div>List All Expenses</div>
    </>
  );
};
export default Expense;
