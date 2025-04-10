import { useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import TextArea from "../ui/TextArea/TextArea";
import SelectField from "../ui/SelectField/SelectField";
import { FaEdit } from "react-icons/fa";
import Table from "../ui/Table/Table";
import axiosInstance from "../../axiosInstance";

const columns = [
  { key: "name", label: "Item Name" },
  { key: "description", label: "Item Description" },
  { key: "category_name", label: "Category Name" },
];

const Item = () => {
  const [item_name, setItemName] = useState("");
  const [item_description, setItemDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [editItem, setEditItem] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [categories, setCategories] = useState([]);

  const clear_state = () => {
    setItemName("");
    setItemDescription("");
    setSelectedCategory(-1);
  };

  const edit_item = (item_obj) => {
    setEditItem(item_obj["id"]);
    setItemName(item_obj["name"]);
    setItemDescription(item_obj["description"]);
    setSelectedCategory(item_obj["category"]);
  };

  const get_all_categories = () => {
    axiosInstance
      .get("category/list_categories")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setCategories(response.data["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const select_Category = (event) => {
    setSelectedCategory(parseInt(event.target.value));
  };

  const addNewItem = (e) => {
    e.preventDefault();
    console.log("Name = ", item_name);
    console.log("Description = ", item_description);
    console.log("Category = ", selectedCategory);

    const payload = {
      name: item_name,
      description: item_description,
      category: selectedCategory,
    };

    add_new_item(payload);
  };

  const add_new_item = (payload) => {
    const url =
      editItem != null ? `item/update?item_id=${editItem}` : "item/add";
    axiosInstance
      .post(url, payload)
      .then(function (response) {
        if (response.status === 200) {
          if (editItem != null) {
            setEditItem(null);
          }
          clear_state();
          get_all_items();
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        // console.log("this will always run.")
      });
  };

  const get_all_items = () => {
    axiosInstance
      .get("item/list_items")
      .then(function (response) {
        // handle success
        setItems(response.data["data"]);
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
    get_all_categories();

    setIsLoading(false);
  }, []);

  return (
    <>
      <div>Create New Items</div>
      <form onSubmit={(e) => addNewItem(e)}>
        <InputField
          field_type="text"
          placeholder_text="Item Name"
          field_value={item_name}
          field_on_change={(e) => setItemName(e.target.value)}
        />
        <br />
        <TextArea
          placeholder_text="Item Description"
          field_value={item_description}
          field_on_change={(e) => setItemDescription(e.target.value)}
        />
        <br />
        <SelectField
          lable_id="category_id"
          label_text="Choose Category"
          value={selectedCategory}
          data={categories}
          change_function={select_Category}
          default_option_value=""
          default_option_text="No Item"
          value_key="id"
          value_text="name"
        />
        <br />
        <Button
          button_type="submit"
          text={editItem != null ? "Update Item" : "Create New Item"}
        />
      </form>
      <hr />
      <div>List All Items</div>
      {!isLoading && items.length > 0 ? (
        <Table columns={columns} data={items} edit_fun={edit_item} />
      ) : (
        <p>no data</p>
      )}
    </>
  );
};
export default Item;
