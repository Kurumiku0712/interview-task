/**********************************************
 * server.js
 *
 * This file is the server for Q2. It reads the categories.json file and
 * converts it to a JavaScript array. It then creates a tree structure from
 * the flat category array and returns it as a JSON object.
 * (Node v22.13.1, express v4.21.2)
 **********************************************/

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

// Read categories.json and convert to JavaScript array
const rawData = fs.readFileSync("categories.json", "utf-8");
const categories = JSON.parse(rawData);

/**
 * Convert flat category array to a tree structure
 * @param {Object[]} categories - The flat category array from categories.json
 * @returns {Object} A root category object with a children property that contains
 *   the category tree structure
 */
function buildCategoryTree(categories) {
  const categoryMap = new Map();

  // Initialize all categories and create mapping
  categories.forEach((category) => {
    categoryMap.set(category.categoryId, { ...category, children: [] });
  });

  let rootCategories = [];

  // Build tree structure
  categories.forEach((category) => {
    if (category.parent === "root") {
      rootCategories.push(categoryMap.get(category.categoryId));
    } else if (categoryMap.has(category.parent)) {
      categoryMap
        .get(category.parent)
        .children.push(categoryMap.get(category.categoryId));
    }
  });

  // Create root category
  return {
    categoryId: "root",
    name: "Root Category",
    parent: null,
    children: rootCategories,
  };
}

// API route
app.get("/categories", (req, res) => {
  const categoryTree = buildCategoryTree(categories);
  res.json(categoryTree);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
