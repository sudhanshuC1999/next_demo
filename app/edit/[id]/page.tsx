"use client";

import React, { FormEventHandler, useEffect, useState } from "react";
import { editTodo, getAllTodos } from "@/api";
import { useRouter } from "next/navigation";
import { ITask } from "@/types/tasks";

interface EditTaskProps {
  openModalEdit: boolean;
  handleSubmitEditTodo: any;
  setOpenModalEdit: any;
  taskToEdit: string;
  setTaskToEdit: any;
}

const EditTask: React.FC<EditTaskProps> = (params: any) => {
  const tasks = getAllTodos();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<{ id: string; text: string }>({
    id: "",
    text: "",
  });
  const [taskToEdit, setTaskToEdit] = useState<string>("gujgggggjgj");
  const router = useRouter();
  const [error, setError] = useState("");

  console.log({ details });
  const fetchDetails = async () => {
    setLoading(true);
    tasks
      .then((res) => {
        const taskdetails: ITask = res.filter(
          (val) => val.id === params.params.id
        )[0];
        setDetails(taskdetails);
        setTaskToEdit(taskdetails.text);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (taskToEdit) {
      await editTodo({
        id: details.id,
        text: taskToEdit,
      });
      router.push("/");
    } else {
      setError("this is required");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ width: "40%", margin: "200px auto" }}>
      <form onSubmit={handleSubmitEditTodo}>
        <span style={{ fontSize: "28px" }}>Update the task</span>
        <div className="flex flex-col">
          <input
            value={taskToEdit}
            onChange={(e) => {
              setError("");
              setTaskToEdit(e.target.value);
            }}
            type="text"
            placeholder="Type here"
            className="p-4 mb-2"
          />
          <p style={{ color: "red" }}>{error}</p>

          <button
            style={{ backgroundColor: "black", color: "white" }}
            className="px-4 py-2 rounded"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
