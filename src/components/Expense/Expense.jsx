import { useState, useEffect } from "react";
import axios from "axios";

const Expense = () => {
  const [allItems, setAllItems] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  const [item, setItem] = useState(-1);
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [weight_unit, setWeightUnit] = useState('');
  const [date, setDate] = useState('');

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

  const get_all_expenses = () => {
    axios
      .get("http://127.0.0.1:8000/expense/list_expenses")
      .then(function (response) {
        // handle success
        console.log(response.data['data']);
        setAllExpenses(response.data["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };


  const add_new_expense = (payload) => {
    axios.post('http://127.0.0.1:8000/expense/add', payload)
    .then(response => {
      if (response.status === 200) {
        clear_item_form();
      }
    }).catch(error => {
      // console.log('error = ', error)
    }).finally( () => {
      // console.log('always executed add new expense block');
    })
  }

  const clear_item_form = () => {
    setItem(-1);
    setQuantity('');
    setDescription("");
    setPrice('');
    setWeight('');
    setWeightUnit("");
    setDate('');
  }

  const create_new_expense = (event) => {
    event.preventDefault();

    const payload = {
      item: item,
      quantity: quantity,
      description: description,
      price: price,
      weight: weight === "" ? null : weight,
      weight_unit: weight_unit === "" ? null : weight_unit,
      date: date
    }

    add_new_expense(payload);

    console.log("payload : ", payload)
  }

  useEffect(() => {
    get_all_expenses()
    get_all_items();
  }, []);

  return (
    <>
      <div>Create New Expense</div>
      <form onSubmit={e => create_new_expense(e)}>
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
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
        />
        <br />
        <label htmlFor="unit">Choose Unit: </label>
        <select name="unit" id="unit" value={weight_unit} onChange={e => setWeightUnit(e.target.value)}>
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
        <br />
        <input type="submit" value="Create New Expense" />
      </form>
      <hr />
      <div>List All Expenses</div>
      {allExpenses.length > 0 ? <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Weight Unit</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allExpenses.map(exp => {
            return (
              <tr key={exp.id}>
                <td>{exp.item_name}</td>
                <td>{exp.description}</td>
                <td>{exp.quantity}</td>
                <td>{exp.price}</td>
                <td>{exp.weight}</td>
                <td>{exp.weight_unit}</td>
                <td>{exp.date}</td>
              </tr>
            )
          })}
        </tbody>
      </table> : <p>No Record</p>}
    </>
  );
};
export default Expense;
