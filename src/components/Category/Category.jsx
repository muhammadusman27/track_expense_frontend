import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import TextArea from "../ui/TextArea/TextArea";
import Table from "../ui/Table/Table";

const columns = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
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
      editID != null
        ? `http://127.0.0.1:8000/category/update?category_id=${editID}`
        : "http://127.0.0.1:8000/category/add";
    axios
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

  const get_all_categories = (config) => {
    axios
      .get("http://127.0.0.1:8000/category/list_categories", config)
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
    const access = localStorage.getItem("access_token", null);
    let config;
    if (access != null) {
      config = {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      };
    }
    get_all_categories(config);

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
        // <table>
        //   <thead>
        //     <tr>
        //       <th>Name</th>
        //       <th>Description</th>
        //       <th>Edit</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {categories.map((category) => {
        //       return (
        //         <tr key={category.id}>
        //           <td>{category.name}</td>
        //           <td>{category.description}</td>
        //           <td>
        //             <FaEdit onClick={() => editCategory(category)} />
        //           </td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
        <Table columns={columns} data={categories} edit_fun={editCategory} />
      ) : (
        <p>no data</p>
      )}
    </>
  );
};
export default Category;
