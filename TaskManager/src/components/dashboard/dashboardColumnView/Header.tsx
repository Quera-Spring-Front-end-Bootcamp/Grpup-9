import { useState } from "react";
import { createPortal } from "react-dom";
import { BsThreeDots, BsPlus } from "react-icons/bs";
import Modal from "../../../layout/Modal";
import AddNewTask from "../../modals/Large/AddNewTask";
import ColMore from "../../modals/Small/ColMore";

type HeaderProps = {
  title: string;
  number: number;
  borderColor: string;
};
const Header = ({ title, number, borderColor }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [colMoreModal, setColMoreModal] = useState(false);
  const handleCardHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };
  const handleNewTaskModal = () => setNewTaskModal(!newTaskModal);
  console.log(borderColor);

  return (
    <div
      className={`flex items-center justify-between w-[250px] bg-white sticky top-0 h-10 rounded px-3 py-2 mb-5 border border-t-2 text-1E1E1E ${borderColor} shadow-[0px_2px_8px_rgba(0,0,0,0.18)]`}
      onMouseOver={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      <div className="flex items-center gap-1">
        <div>{title}</div>
        <div className="flex justify-center items-center h-4 w-3 p-1 rounded-full bg-F4F4F4 text-[10px] leading-5">
          {number}
        </div>
      </div>
      {isHovered && (
        <div className="flex items-center gap-1">
          <span
            className="relative hover:scale-110"
            onClick={() => setColMoreModal(!colMoreModal)}
          >
            <BsThreeDots />
            {colMoreModal && <ColMore />}
          </span>
          <span
            className="hover:scale-110 text-xl data-[title]:text-red-500"
            title="افزودن تسک"
            onClick={handleNewTaskModal}
          >
            <BsPlus />
          </span>
        </div>
      )}

      {newTaskModal &&
        createPortal(
          <Modal>
            <AddNewTask handleNewTaskModal={handleNewTaskModal} />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default Header;