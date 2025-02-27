/* eslint-disable react/prop-types */

/**********************************************
 * CategoryTreeSelect.jsx
 *
 * Renders the Ant Design TreeSelect using the category tree data from Redux.
 **********************************************/

import { useCallback } from "react";
import { TreeSelect } from "antd";

//Transform the category tree data into a format that can be used by the TreeSelect component.
export default function CategoryTreeSelect({ categoryTree }) {
  // Recursive transform function
  const transformNode = useCallback((node) => {
    return {
      title: node.name,
      value: node.categoryId,
      key: node.categoryId,
      children: node.children
        ? node.children.map((child) => transformNode(child))
        : [],
    };
  }, []);

  const treeData = categoryTree?.children
    ? categoryTree.children.map((child) => transformNode(child))
    : [];

  const onChange = (value) => {
    alert(`Selected category ID: ${value}`);
  };

  return (
    <TreeSelect
      style={{ width: 800 }}
      dropdownStyle={{ maxHeight: 1000, overflow: "auto" }}
      treeData={treeData}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
}
