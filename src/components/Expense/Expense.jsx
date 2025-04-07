import { useState, useEffect } from "react";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import TextArea from "../ui/TextArea/TextArea";
import SelectField from "../ui/SelectField/SelectField";
import axiosInstance from "../../axiosInstance";
import Table from "../ui/Table/Table";

const weights = [
  { key: "kg", value: "kg (kilogram)" },
  { key: "g", value: "g (gram)" },
  { key: "ml", value: "ml (milli-liter)" },
];

const columns = [
  { key: "name", label: "Expense Name" },
  { key: "description", label: "Expense Description" },
  { key: "category_name", label: "Category Name" },
  { key: "quantity", label: "Quantity" },
  { key: "weight_unit", label: "Weight Unit" },
  { key: "price", label: "Price" },
  { key: "date", label: "Date" },
];

const Expense = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  const [item, setItem] = useState(-1);
  const [category, setCategory] = useState(-1);
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [weight_unit, setWeightUnit] = useState("");
  const [date, setDate] = useState("");
  const [editExpense, setEditExpense] = useState(null);

  const get_all_items = () => {
    axiosInstance
      .get("item/list_items")
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

  const get_all_categories = () => {
    axiosInstance
      .get("category/list_categories")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setAllCategories(response.data["data"]);
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
    axiosInstance
      .get("expense/list_expenses")
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
        ? `expense/update?expense_id=${editExpense}`
        : "expense/add";
    axiosInstance
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
    setCategory(-1);
    setQuantity('');
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
      item: item === -1 ? null : item,
      category: category === -1 ? null : category,
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
    get_all_categories();
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
          lable_id="category"
          label_text="Choose Category"
          value={category}
          data={allCategories}
          change_function={(e) => setCategory(e.target.value)}
          default_option_value=""
          default_option_text="No Category"
          value_key="id"
          value_text="name"
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
        <Table columns={columns} data={allExpenses} edit_fun={edit_expense} />
      ) : (
        <p>No Record</p>
      )}
    </>
  );
};
export default Expense;
