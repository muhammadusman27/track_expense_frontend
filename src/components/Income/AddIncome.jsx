import { useEffect, useState } from "react";
import InputField from "../ui/InputField/InputField";
import Button from "../ui/Button/Button";
import SelectField from "../ui/SelectField/SelectField";
import axiosInstance from "../../axiosInstance";
import Table from "../ui/Table/Table";

const columns = [
  { key: "account_name", label: "Account Name" },
  { key: "income_name", label: "Income Name" },
  { key: "amount", label: "Income Amount" },
  { key: "date", label: "Date" },
];

const AddIncome = () => {
  const [incomeData, setIncomeData] = useState();
  const [accountData, setAccountData] = useState();
  const [incomeAmountData, setIncomeAmountData] = useState();

  const [income, setIncome] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const get_all_income_data = () => {
    axiosInstance.get("income/get_list_income").then((response) => {
      if (response.status === 200) {
        setIncomeData(response.data["data"]);
        console.log("data = ", response.data["data"]);
      }
    });
  };

  const get_all_income_amount_data = () => {
    axiosInstance.get("income/list_income_amount").then((response) => {
      if (response.status === 200) {
        setIncomeAmountData(response.data["data"]);
        console.log("data = ", response.data["data"]);
      }
    });
  };

  const get_all_account_data = () => {
    axiosInstance.get("account_balance/list_account").then((response) => {
      if (response.status === 200) {
        setAccountData(response.data["data"]);
        console.log("account data = ", response.data["data"]);
      }
    });
  };

  const create_income = (e) => {
    e.preventDefault();
    // console.log("Income = ", income);
    // console.log("Account = ", account);
    // console.log("Amount = ", amount);
    // console.log("Date = ", date);

    const payload = {
      income: income,
      account: account,
      amount: amount,
      date: date,
    };

    add_income(payload);
  };

  const clear_state = () => {
    setIncome("");
    setAccount("");
    setAmount("");
    setDate("");
  };

  const add_income = (payload) => {
    const url = "income/create_income_amount";
    axiosInstance
      .post(url, payload)
      .then(function (response) {
        if (response.status === 200) {
          clear_state();
          get_all_income_amount_data();
          if (editID != null) {
            setEditID(null);
          }
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    get_all_income_data();
    get_all_account_data();
    get_all_income_amount_data();
  }, []);

  return (
    <>
      <h1>Add Income Amount</h1>
      {incomeData ? (
        <form onSubmit={(e) => create_income(e)}>
          <SelectField
            lable_id="income"
            label_text="Choose Income"
            value={income}
            data={incomeData}
            change_function={(e) => setIncome(e.target.value)}
            default_option_value=""
            default_option_text="No Income"
            value_key="id"
            value_text="name"
          />

          <br />
          <br />

          <SelectField
            lable_id="Account"
            label_text="Choose Account"
            value={account}
            data={accountData}
            change_function={(e) => setAccount(e.target.value)}
            default_option_value=""
            default_option_text="No Account"
            value_key="id"
            value_text="name"
          />

          <br />
          <br />

          <InputField
            field_type="number"
            placeholder_text="Amount"
            field_value={amount}
            field_on_change={(e) => setAmount(e.target.value)}
          />

          <br />
          <InputField
            field_type="date"
            placeholder_text="Income Date"
            field_value={date}
            field_on_change={(e) => setDate(e.target.value)}
          />
          <br />
          <Button button_type="submit" text={"Create Income"} />
        </form>
      ) : (
        <p>Add Income</p>
      )}
      <hr />
      {incomeAmountData && incomeAmountData.length > 0 ? (
        <Table columns={columns} data={incomeAmountData} edit_fun={ () => console.log()} />
      ) : (
        <p>no data</p>
      )}
    </>
  );
};

export default AddIncome;
