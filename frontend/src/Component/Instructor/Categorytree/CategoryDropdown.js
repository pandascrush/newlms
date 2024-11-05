import React, { useState } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

const CategoryDropdown = () => {
  const [selected, setSelected] = useState([]);

  // Example category data with nested courses, modules, and submodules
  const data = [
    {
      label: 'Category 1',
      value: 'category-1',
      children: [
        {
          label: 'Course 1.1',
          value: 'course-1-1',
          children: [
            {
              label: 'Module 1.1.1',
              value: 'module-1-1-1',
              children: [
                {
                  label: 'Submodule 1.1.1.1',
                  value: 'submodule-1-1-1-1',
                },
                {
                  label: 'Submodule 1.1.1.2',
                  value: 'submodule-1-1-1-2',
                },
              ],
            },
            {
              label: 'Module 1.1.2',
              value: 'module-1-1-2',
              children: [
                {
                  label: 'Submodule 1.1.2.1',
                  value: 'submodule-1-1-2-1',
                },
              ],
            },
          ],
        },
        {
          label: 'Course 1.2',
          value: 'course-1-2',
          children: [
            {
              label: 'Module 1.2.1',
              value: 'module-1-2-1',
              children: [
                {
                  label: 'Submodule 1.2.1.1',
                  value: 'submodule-1-2-1-1',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Category 2',
      value: 'category-2',
      children: [
        {
          label: 'Course 2.1',
          value: 'course-2-1',
          children: [
            {
              label: 'Module 2.1.1',
              value: 'module-2-1-1',
              children: [
                {
                  label: 'Submodule 2.1.1.1',
                  value: 'submodule-2-1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: 'Course 2.2',
          value: 'course-2-2',
          children: [
            {
              label: 'Module 2.2.1',
              value: 'module-2-2-1',
              children: [
                {
                  label: 'Submodule 2.2.1.1',
                  value: 'submodule-2-2-1-1',
                },
              ],
            },
            {
              label: 'Module 2.2.2',
              value: 'module-2-2-2',
              children: [
                {
                  label: 'Submodule 2.2.2.1',
                  value: 'submodule-2-2-2-1',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleChange = (currentNode, selectedNodes) => {
    setSelected(selectedNodes);

    // Show alert with the label of the selected node
    if (currentNode && currentNode.label) {
      alert(`Selected: ${currentNode.label}`);
    }

    console.log('Selected Nodes:', selectedNodes);
  };

  return (
    <div className='m-1'>
     <h6>Select the module</h6>
      <DropdownTreeSelect
        data={data}
        onChange={handleChange}
        className="bootstrap-demo"
        texts={{ placeholder: "Select..." }}
      />
    </div>
  );
};

export default CategoryDropdown;


