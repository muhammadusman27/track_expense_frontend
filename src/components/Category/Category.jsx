import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import TextArea from "../ui/TextArea/TextArea";
import Table from "../ui/Table/Table";
import axiosInstance from "../../axiosInstance";

const columns = [
  { key: "name", label: "Category Name" },
  { key: "description", label: "Category Description" },
];

const Category = () => {
  const [category_name, setCategoryName] = useState("");
  const [category_description, setCategoryDescription] = useState("");
  const [editID, setEditID] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const clear_state = () => {
    setCategoryName("");
    setCategoryDescription("");
  };

  const editCategory = (category_obj) => {
    setEditID(category_obj["id"]);
    setCategoryName(category_obj["name"]);
    setCategoryDescription(category_obj["description"]);
  };

  const addNewCategory = (e) => {
    e.preventDefault();
    console.log("Name = ", category_name);
    console.log("Description = ", category_description);

    const payload = {
      name: category_name,
      description: category_description,
    };

    add_new_category(payload);
  };

  const add_new_category = (payload) => {
    const url =
      editID != null ? `category/update?category_id=${editID}` : "category/add";
    axiosInstance
      .post(url, payload)
      .then(function (response) {
        if (response.status === 200) {
          clear_state();
          get_all_categories();
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

  const get_all_categories = () => {
    axiosInstance
      .get("category/list_categories")
      .then(function (response) {
        // handle success
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

  useEffect(() => {
    get_all_categories();

    setIsLoading(false);
  }, []);

  return (
    <>
      <div>Create New Categories</div>
      <form onSubmit={(e) => addNewCategory(e)}>
        <InputField
          field_type="text"
          placeholder_text="Category Name"
          field_value={category_name}
          field_on_change={(e) => setCategoryName(e.target.value)}
        />
        <br />
        <TextArea
          placeholder_text="Category Description"
          field_value={category_description}
          field_on_change={(e) => setCategoryDescription(e.target.value)}
        />
        <br />
        <Button
          button_type="submit"
          text={editID != null ? "Update Category" : "Create New Category"}
          background="black"
          color="white"
        />
      </form>
      <hr />
      <div>List All Categories</div>
      {!isLoading && categories.length > 0 ? (
        <Table columns={columns} data={categories} edit_fun={editCategory} />
      ) : (
        <p>no data</p>
      )}
    </>
  );
};
export default Category;
