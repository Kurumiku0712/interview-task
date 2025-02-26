/**********************************************
 * fetchCategories.js
 *
 * This file is the entry point for the server. 
 **********************************************/


/**
 * Fetches the category tree from the server and logs it to the console.
 * @throws {Error} If the server returns an HTTP error.
 */
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:8080/categories");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const categoryTree = await response.json();
    console.log(
      "Fetched Category Tree:",
      JSON.stringify(categoryTree, null, 2)
    );
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}

fetchCategories();
