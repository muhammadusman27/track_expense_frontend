import { useEffect, useState } from "react";

import axios from "axios";

const Category = () => {
  const [category_name, setCategoryName] = useState("");
  const [category_description, setCategoryDescription] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const clear_state = () => {
    setCategoryName("");
    setCategoryDescription("");
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
    axios
      .post("http://127.0.0.1:8000/category/add", payload)
      .then(function (response) {
        if (response.status === 200) {
          clear_state();
          get_all_categories();
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const get_all_categories = () => {
    axios
      .get("http://127.0.0.1:8000/category/list_categories")
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

  useEffect(() => {
    get_all_categories();

    setIsLoading(false);
  }, []);

  return (
    <>
      <div>Create New Categories</div>
      <form onSubmit={(e) => addNewCategory(e)}>
        <input
          type="text"
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
          value={category_name}
        />
        <br />
        <input
          type="text"
          placeholder="Category Description"
          onChange={(e) => setCategoryDescription(e.target.value)}
          value={category_description}
        />
        <br />
        <input type="submit" value="Create New Category" />
      </form>
      <hr />
      <div>List All Categories</div>
      {!isLoading && categories.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>no data</p>
      )}
    </>
  );
};
export default Category;
