import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import TextArea from "../ui/TextArea/TextArea";
import Table from "../ui/Table/Table";
import axiosInstance from "../../axiosInstance";

const columns = [
  { key: "name", label: "Account Name" },
  { key: "balance", label: "Account Balance" },
];

const Account = () => {
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [editID, setEditID] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  const clear_state = () => {
    setAccountName("");
    setAccountBalance("");
  };

  const editCategory = (category_obj) => {
    setEditID(category_obj["id"]);
    setAccountName(category_obj["name"]);
    setAccountBalance(category_obj["balance"]);
  };

  const addNewAccount = (e) => {
    e.preventDefault();
    console.log("Name = ", accountName);
    console.log("Balance = ", accountBalance);

    const payload = {
      name: accountName,
      balance: accountBalance,
    };

    add_new_account(payload);
  };

  const add_new_account = (payload) => {
    const url =
      editID != null ? `account_balance/update?account_id=${editID}` : "account_balance/add";
    axiosInstance
      .post(url, payload)
      .then(function (response) {
        if (response.status === 200) {
          clear_state();
          get_all_accounts();
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

  const get_all_accounts = () => {
    axiosInstance
      .get("account_balance/list_account")
      .then(function (response) {
        // handle success
        setAccounts(response.data["data"]);
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
    get_all_accounts();

    setIsLoading(false);
  }, []);

  return (
    <>
      <div>Create New Account</div>
      <form onSubmit={(e) => addNewAccount(e)}>
        <InputField
          field_type="text"
          placeholder_text="Category Name"
          field_value={accountName}
          field_on_change={(e) => setAccountName(e.target.value)}
        />
        <br />
        <InputField
          field_type="number"
          placeholder_text="Account Balance"
          field_value={accountBalance}
          field_on_change={(e) => setAccountBalance(e.target.value)}
        />
        <br />
        <Button
          button_type="submit"
          text={editID != null ? "Update Account" : "Create New Account"}
          background="black"
          color="white"
        />
      </form>
      <hr />
      <div>List All Accounts</div>
      {!isLoading && accounts.length > 0 ? (
        <Table columns={columns} data={accounts} edit_fun={editCategory} />
      ) : (
        <p>no data</p>
      )}
    </>
  );
};
export default Account;
