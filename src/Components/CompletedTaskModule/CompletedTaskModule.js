import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "semantic-ui-react";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { changeTaskStatus } from "../../Store/Action/CreateAction";
import "./CompletedTaskModule.css";

const reorder = (list, startIndex, endIndex) => {
  const arrayList = Array.from(list);
  const [removed] = arrayList.splice(startIndex, 1);
  arrayList.splice(endIndex, 0, removed);
  return arrayList;
};

const getListStyle = (isDragging) => ({
  padding: 10,
  width: 500,
  borderRadius: "15px",
  background: isDragging ? "rgb(138 207 163)" : "rgb(22 108 159)",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 8,
  margin: `5px 0 5px 0`,
  background: isDragging ? "#D8E3E7" : "white",
  ...draggableStyle,
});

const CompletedTaskModule = () => {
  const completedList = useSelector((state) => state.task);
  const [itemListData, setItemListData] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const competedData = completedList.filter((item) => item.completed);
    setItemListData(competedData);
  }, [completedList]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      itemListData,
      result.source.index,
      result.destination.index
    );
    setItemListData(items);
  };

  const handleChange = (id, e) => {
    const obj = {
      isChecked: e.target.checked,
      id,
    };
    dispatch(changeTaskStatus(obj));
    toast.success("Task moved successfully");
  };

  return (
    <Container>
      <div className="text-center">
        <div className="mt-3">
          <h2>Completed task</h2>
        </div>
        <div className="card-center">
          {itemListData.length >= 1 ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {itemListData &&
                      itemListData.map((item, index) => (
                        <Draggable
                          key={item.name}
                          draggableId={item.name}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="d-flex justify-space-between radius-10"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.name}
                              <div>
                                <label></label>
                                <input
                                  type="checkbox"
                                  defaultChecked={item.completed}
                                  onChange={(e) => handleChange(item.id, e)}
                                  name="example"
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <>No Tasks</>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CompletedTaskModule;
