import { useEffect, useState } from "react";
import InputField from "../ui/InputField/InputField";
import Button from "../ui/Button/Button";
import TextArea from "../ui/TextArea/TextArea";
import axiosInstance from "../../axiosInstance";
import Table from "../ui/Table/Table";

const columns = [
  { key: "name", label: "Name" },
  { key: "amount", label: "Amount" },
  { key: "description", label: "Description" },
  { key: "date", label: "Date" },
];

const Income = () => {
  const [incomeData, setIncomeData] = useState(null);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [editIncomeID, setEditIncomeID] = useState(null);

  const cleat_income_state = () => {
    setName("");
    setAmount("");
    setDescription("");
    setDate("");
  };

  const create_update_income = (e) => {
    e.preventDefault();
    const payload = get_income_payload();
    let url = "";
    if (editIncomeID) {
      url = `income/update?income_id=${editIncomeID}`;
    } else {
      url = "income/add";
    }
    axiosInstance
      .post(url, payload)
      .then((response) => {
        if (response.status === 200) {
          cleat_income_state();
        }
        // console.log("response = ", response);
      })
      .catch((error) => {
        // console.log("error = ", error);
      })
      .finally(() => {
        // console.log("income finally block is here.");
      });
  };

  const get_income_payload = () => {
    return {
      name: name,
      amount: amount,
      description: description,
      date: date,
    };
  };

  const get_all_income_date = () => {
    axiosInstance.get("income/get_list_income").then((response) => {
      if (response.status === 200) {
        setIncomeData(response.data["data"]);
        // console.log("data = ", response.data["data"]);
      }
    });
  };

  const setEditIncome = (income_obj) => {
    setEditIncomeID(income_obj["id"]);
    setName(income_obj["name"]);
    setAmount(income_obj["amount"]);
    setDescription(
      income_obj["description"] === null ? "" : income_obj["description"]
    );
    setDate(income_obj["date"]);
  };

  useEffect(() => {
    get_all_income_date();
  }, []);

  return (
    <>
      <h1>Add Income</h1>
      <form onSubmit={(e) => create_update_income(e)}>
        <InputField
          field_type="text"
          placeholder_text="Income title"
          field_value={name}
          field_on_change={(e) => setName(e.target.value)}
        />
        <br />
        <InputField
          field_type="number"
          placeholder_text="Amount"
          field_value={amount}
          field_on_change={(e) => setAmount(e.target.value)}
        />
        <br />
        <TextArea
          placeholder_text="Description"
          field_value={description}
          field_on_change={(e) => setDescription(e.target.value)}
        />
        <br />
        <InputField
          field_type="date"
          placeholder_text="Income Date"
          field_value={date}
          field_on_change={(e) => setDate(e.target.value)}
        />
        <br />
        <Button
          button_type="submit"
          text={setEditIncomeID ? "Update Income" : "Create Income"}
        />
      </form>
      <hr />
      {incomeData && incomeData.length > 0 ? (
        <Table columns={columns} data={incomeData} edit_fun={setEditIncome} />
      ) : (
        <p>no data</p>
      )}
    </>
  );
};

export default Income;
