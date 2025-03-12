import { useState, useEffect } from "react";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import TextArea from "../ui/TextArea/TextArea";
import SelectField from "../ui/SelectField/SelectField";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const weights = [
  { key: "kg", value: "kg (kilogram)" },
  { key: "g", value: "g (gram)" },
  { key: "ml", value: "ml (milli-liter)" },
];

const Expense = () => {
  const [allItems, setAllItems] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  const [item, setItem] = useState(-1);
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [weight_unit, setWeightUnit] = useState("");
  const [date, setDate] = useState("");
  const [editExpense, setEditExpense] = useState(null);

  const get_all_items = () => {
    axios
      .get("http://127.0.0.1:8000/item/list_items")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setAllItems(response.data["data"]);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const edit_expense = (expense_obj) => {
    setEditExpense(expense_obj["id"]);
    setItem(expense_obj["item"] != null ? expense_obj["item"] : "");
    setQuantity(expense_obj["quantity"] != null ? expense_obj["quantity"] : "");
    setName(expense_obj["name"]);
    setDescription(
      expense_obj["description"] != null ? expense_obj["description"] : ""
    );
    setPrice(expense_obj["price"] != null ? expense_obj["price"] : "");
    setWeight(expense_obj["weight"] != null ? expense_obj["weight"] : "");
    setWeightUnit(
      expense_obj["weight_unit"] != null ? expense_obj["weight_unit"] : ""
    );
    setDate(expense_obj["date"] != null ? expense_obj["date"] : "");
  };

  const get_all_expenses = () => {
    axios
      .get("http://127.0.0.1:8000/expense/list_expenses")
      .then(function (response) {
        // handle success
        setAllExpenses(response.data["data"]);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const add_new_expense = (payload) => {
    const url =
      editExpense != null
        ? `http://127.0.0.1:8000/expense/update?expense_id=${editExpense}`
        : "http://127.0.0.1:8000/expense/add";
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status === 200) {
          clear_item_form();
          get_all_expenses();
        }
      })
      .catch((error) => {
        // console.log('error = ', error)
      })
      .finally(() => {
        // console.log('always executed add new expense block');
      });
  };

  const clear_item_form = () => {
    setName("");
    setDescription("");
    setItem(-1);
    setQuantity("");
    setPrice("");
    setWeight("");
    setWeightUnit("");
    setDate("");
  };

  const create_new_expense = (event) => {
    event.preventDefault();

    const payload = {
      name: name,
      description: description,
      item: item === "" ? null : item,
      quantity: quantity,
      price: price,
      weight: weight === "" ? null : weight,
      weight_unit: weight_unit === "" ? null : weight_unit,
      date: date,
    };

    add_new_expense(payload);
  };

  useEffect(() => {
    get_all_expenses();
    get_all_items();
  }, []);

  return (
    <>
      <div>Create New Expense</div>
      <form onSubmit={(e) => create_new_expense(e)}>
        <InputField
          field_type="text"
          placeholder_text="Expense Name"
          field_value={name}
          field_on_change={(e) => setName(e.target.value)}
        />
        <br />
        <TextArea
          placeholder_text="Expense Description"
          field_value={description}
          field_on_change={(e) => setDescription(e.target.value)}
        />
        <br />
        <SelectField
          lable_id="item"
          label_text="Choose Item"
          value={item}
          data={allItems}
          change_function={(e) => setItem(e.target.value)}
          default_option_value=""
          default_option_text="No Item"
          value_key="id"
          value_text="name"
        />
        <br />
        <InputField
          field_type="number"
          placeholder_text="Quantity"
          field_value={quantity}
          field_on_change={(e) => setQuantity(e.target.value)}
        />
        <br />
        <InputField
          field_type="number"
          placeholder_text="Price"
          field_value={price}
          field_on_change={(e) => setPrice(e.target.value)}
        />
        <br />
        <InputField
          field_type="number"
          placeholder_text="Weight"
          field_value={weight}
          field_on_change={(e) => setWeight(e.target.value)}
        />
        <br />
        <SelectField
          lable_id="unit"
          label_text="Choose Unit"
          value={weight_unit}
          data={weights}
          change_function={(e) => setWeightUnit(e.target.value)}
          default_option_value=""
          default_option_text="No Unit"
          value_key="key"
          value_text="value"
        />
        <br />
        <InputField
          field_type="date"
          placeholder_text="Date"
          field_value={date}
          field_on_change={(e) => setDate(e.target.value)}
        />
        <br />
        <Button
          button_type="submit"
          text={editExpense != null ? "Update Expense" : "Create New Expense"}
        />
      </form>
      <hr />
      <div>List All Expenses</div>
      {allExpenses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Expense Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Weight Unit</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.map((exp) => {
              return (
                <tr key={exp.id}>
                  <td>{exp.item_name}</td>
                  <td>{exp.description}</td>
                  <td>{exp.quantity}</td>
                  <td>{exp.price}</td>
                  <td>{exp.weight}</td>
                  <td>{exp.weight_unit}</td>
                  <td>{exp.date}</td>
                  <td>
                    <FaEdit onClick={() => edit_expense(exp)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Record</p>
      )}
    </>
  );
};
export default Expense;
