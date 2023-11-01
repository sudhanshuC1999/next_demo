"use client";

import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (newTaskValue.trim() === "") {
      // If the input value is empty or contains only whitespace, set an error message.
      setInputError("This field is required");
    } else {
      // Input is valid, so proceed with adding the todo.
      await addTodo({
        id: uuidv4(),
        text: newTaskValue,
      });

      setNewTaskValue("");
      setModalOpen(false);
      setInputError(null);
      router.refresh();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button
        style={{ backgroundColor: "black", color: "white" }}
        className="p-6 rounded my-6"
        onClick={() => setModalOpen(true)}
      >
        Create New ToDo +
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <span style={{ fontSize: "28px" }}>Add a new task</span>
          <div className="flex flex-col">
            <input
              value={newTaskValue}
              onChange={(e) => {
                setNewTaskValue(e.target.value);
                // Clear the input error message when the user types in the input field.
                setInputError(null);
              }}
              type="text"
              placeholder="Type here"
              className="p-4 mb-2"
            />
            {inputError && <span style={{ color: "red" }}>{inputError}</span>}
            <button
              style={{ backgroundColor: "black", color: "white" }}
              className="px-4 py-2 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
