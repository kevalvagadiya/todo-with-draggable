import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./navBar.css";

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("create");
  let history = useHistory();
  const createList = useSelector((state) => state.task);
  let completedCount =
    createList && createList.filter((item) => item.completed);
  let notCompletedCount =
    createList && createList.filter((item) => !item.completed);
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    history.push(`/${name}`);
  };
  return (
    <div className="nav-wrapper">
      <div className="nav-items">
        <div className="nav-list">
          <Menu pointing>
            <Menu.Item
              name="create"
              active={activeItem === "create"}
              onClick={handleItemClick}
              color="green"
            />
            <Menu.Item
              color="green"
              name="completed"
              active={activeItem === "completed"}
              onClick={handleItemClick}
            />
          </Menu>
        </div>
        <div className="counter-wrapper">
          {`${completedCount.length} tasks done`}
        </div>
        <div className="counter-wrapper">
          {`${notCompletedCount.length} tasks remaining`}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
