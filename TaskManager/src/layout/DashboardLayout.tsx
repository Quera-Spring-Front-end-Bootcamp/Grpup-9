import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/dashboard/dashboardHeader/Header";
import SideBar from "../components/dashboard/dashboardSidebar/SideBar";
import Button from "../components/ui/Button";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import AddNewTask from "../components/modals/Large/AddNewTask";
import { useAppDispatch, useAppSelector } from "../services/app/hook";
import SelectBoard from "../components/modals/Medium/SelectBoard";
import {
  fetchBoards,
  fetchCreateTask,
  resetBoard,
} from "../services/app/store";

// type BoardType = {
//   _id: string;
//   name: string;
// };

// type DataListState = {
//   data: BoardType[];
//   status: string;
//   selectedId: string;
// };

const DashboardLayout = () => {
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [dataList, setDataList] = useState<any>({
    data: [],
    status: "ورک اسپیس",
    selectedId: "",
  });
  const Location = useLocation();
  const dispatch = useAppDispatch();
  const { selectedProject } = useAppSelector((state) => state.projects);
  const { selectedWorkSpaceHeader } = useAppSelector(
    (state) => state.workSpaces
  );

  const { projects, isSuccess } = useAppSelector((state) => state.boards);
  const { workSpaces } = useAppSelector((state) => state.workSpaces);
  const { isSuccess: isSuccessTask } = useAppSelector((state) => state.tasks);

  // handle modal new task and get boards
  const handleNewTaskModal = (arg:boolean) => {
    setNewTaskModal(arg);
    setDataList({ data: workSpaces, status: "ورک اسپیس", selectedId: "" });
  };

  // handle selected board id and modal step
  const handleSelectBoardList = async (id?: string | undefined) => {
    if (dataList.status === "ورک اسپیس") {
      const selectedWorkSpace = workSpaces.filter(
        (workspace) => workspace._id === id
      );
      const newData = selectedWorkSpace[0]?.projects;
      setDataList({ ...dataList, status: "پروژه", data: newData });
    }
    if (dataList.status === "پروژه") {
      // fetchBoards
      const projectIndex = projects.findIndex(
        (project) => project.projectId === id
      );
      if (projectIndex < 0) {
        const res = await dispatch(fetchBoards(id || ''));
        dispatch(resetBoard())
        setDataList({
          ...dataList,
          data: res.payload,
          status: "برد",
        });
      } else {
        const selectedProject = projects.find(
          (project) => project.projectId === id
        );
        setDataList({
          ...dataList,
          data: selectedProject?.projectBoards,
          status: "برد",
        });
      }
    }
    if (dataList.status === "برد") {
      setDataList({ ...dataList, status: "تسک", selectedId: id });
    }
  };

  // handle add new task with dispatch redux toolkit
  const handleDispatchNewTask = (data: (string | undefined)[]) => {
    const [name, description, deadline] = [...data];
    const formData = {
      name,
      description,
      deadline,
      boardId: dataList.selectedId,
    };
    dispatch(fetchCreateTask(formData));
    // setNewTaskModal(false);
    handleNewTaskModal(false)

  };

  // useEffect(() => {
  //   // if (dataList.status === "ورک اسپیس") {
  //   //   setDataList({ ...dataList, data: workSpaces });
  //   // }

  //   if (isSuccessTask) {
  //     // setNewTaskModal(false);
  //     // setDataList({ data: workSpaces, status: "ورک اسپیس", selectedId: "" });
  //     handleNewTaskModal(false)
  //   }
  // }, );

  const colors = [
    "bg-F92E8F",
    "bg-F1A25C",
    "bg-118C80",
    "bg-2E7FF9",
    "bg-C074D1",
    "bg-71FDA9",
    "bg-FFE605",
    "bg-F92E8F",
    "bg-F1A25C",
    "bg-118C80",
    "bg-2E7FF9",
    "bg-C074D1",
    "bg-71FDA9",
    "bg-FFE605",
  ];
  const borderColors = [
    "border-t-F92E8F",
    "border-t-F1A25C",
    "border-t-118C80",
    "border-t-2E7FF9",
    "border-t-C074D1",
    "border-t-71FDA9",
    "border-t-FFE605",
    "border-t-F92E8F",
    "border-t-F1A25C",
    "border-t-118C80",
    "border-t-2E7FF9",
    "border-t-C074D1",
    "border-t-71FDA9",
    "border-t-FFE605",
  ];
  localStorage.setItem("Colors", JSON.stringify(colors));
  localStorage.setItem("BorderColors", JSON.stringify(borderColors));

  const commonStyle =
    "max-w-[85vw] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white gap-5 h-[calc(100%-12rem)]";

  let WraperClasses = "";
  // Dynamically styling different view wrapers
  if (Location.pathname === "/columnview")
    WraperClasses = `overflow-x-auto my-4 overflow-y-hidden flex ${commonStyle} `;
  else if (Location.pathname === "/" || Location.pathname === "/listview")
    WraperClasses = `overflow-y-auto mt-4 flex ${commonStyle}`;
  else if (Location.pathname === "/calendarview")
    WraperClasses = "overflow-hidden mt-2 h-[calc(100%-14rem)]";

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-4/5 pr-4 pl-10 min-h-screen">
        {/* Header */}
        <Header
          projectName={
            Location.pathname === "/columnview"
              ? selectedProject
              : selectedWorkSpaceHeader
          }
        />
        {/* Without Classes for calander view */}
        <div className={`${WraperClasses} relative`}>
          <Outlet />
        </div>
      </div>
      <div className="fixed left-5 bottom-3 cur z-45">
        <Button
          className="text-l px-2 py rounded-lg"
          value={"تسک جدید"}
          onClick={() => handleNewTaskModal(true)}
        >
          <CgAddR
            size={20}
            color="white"
            className="ml-2 rounded-md mb-[1px]"
          />
        </Button>
      </div>

      {/* handle modal new task */}
      {newTaskModal &&
        createPortal(
          <Modal>
            {dataList.status === "تسک" ? (
              <AddNewTask
                handleAddNewTask={handleDispatchNewTask}
                handleNewTaskModal={handleNewTaskModal}
              />
            ) : (
              <SelectBoard
                data={dataList.data}
                selectedHandle={handleSelectBoardList}
                status={dataList.status}
                toggleModal={handleNewTaskModal}
              />
            )}
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default DashboardLayout;
