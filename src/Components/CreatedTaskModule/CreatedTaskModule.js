import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Input, Button, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";

import {
  createTask,
  addTaskListUsingThunk,
  deleteTask,
  changeTaskStatus,
} from "../../Store/Action/CreateAction";
import "./CreatedTaskModule.css";

const CreatedTaskModule = () => {
  const dispatch = useDispatch();
  const createList = useSelector((state) => state.task);
  const [task, setTask] = useState("");

  const addTaskList = () => {
    const taskObj = {
      name: task,
      id: Math.floor(Math.random() * 100000 + 1),
      completed: false,
    };
    dispatch(createTask(taskObj));
    setTask("");
    toast.success("Task added successfully");
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleChangeCheckBox = (id, e) => {
    const obj = {
      isChecked: e.target.checked,
      id,
    };
    dispatch(changeTaskStatus(obj));
    toast.success("Task moved successfully");
  };

  useEffect(() => {
    if (!localStorage.getItem("tasks")) dispatch(addTaskListUsingThunk());
  }, []);

  return (
    <Container>
      <div className="d-flex">
        <div className="text-center">
          <div className="mt-3">
            <h2>Task List</h2>
          </div>
          <div className="mt-3">
            <Input
              size="medium"
              value={task}
              className="mr-2"
              onChange={(e) => handleChange(e)}
              placeholder="Enter task here..."
            />
            <Button content="Add" onClick={() => addTaskList()} />
          </div>
          {createList &&
            createList.map((x) => {
              return (
                <div key={x.id}>
                  <div className="mt-2">
                    {x.completed ? (
                      ""
                    ) : (
                      <div className="inline-block">
                        <div className="card-wrapper cards">
                          <div className="card">
                            <div className="content">
                              <Grid columns="three" divided>
                                <Grid.Row>
                                  <Grid.Column>
                                    <input
                                      type="checkbox"
                                      defaultChecked={x.completed}
                                      onChange={(e) =>
                                        handleChangeCheckBox(x.id, e)
                                      }
                                      name="example"
                                    />
                                  </Grid.Column>
                                  <Grid.Column>
                                    <div className="mt-1">
                                      <label>{x.name}</label>
                                    </div>
                                  </Grid.Column>
                                  <Grid.Column>
                                    <div>
                                      <label></label>

                                      <button
                                        className="ui red delete-button  ml-2 p-4"
                                        onClick={(e) => {
                                          toast.error(
                                            "Task removed successfully"
                                          );
                                          dispatch(deleteTask(x.id));
                                        }}
                                      >
                                        <i
                                          aria-hidden="true"
                                          className="delete icon"
                                        ></i>
                                      </button>
                                    </div>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default CreatedTaskModule;
