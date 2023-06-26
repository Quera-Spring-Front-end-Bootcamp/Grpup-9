import { GoPlay } from "react-icons/go";
import Watchers from "../ui/Watchers";
import CloseIcon from "../ui/Close";
import { BsCalendar3 } from "react-icons/bs";
import { createPortal } from "react-dom";
import QuckCalendar from "../modals/Large/QuckCalendar";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { fetchUpdateTask } from "../../services/app/store";
import { getPersianDateWithOutTime } from "./getPersianDate";
import getGregorianDate from "./getGregorianDate";

type TaskInfoHeaderLeftProps = {
  handleCloseTaskInfo: () => void;
  deadline: string | undefined;
  description: string;
  name: string;
};

const TaskInfoHeaderLeft = ({
  handleCloseTaskInfo,
  deadline,
  description,
  name,
}: TaskInfoHeaderLeftProps) => {
  const [calendar, setCalendar] = useState({
    modal: false,
    value: "",
  });
  const handleCalendar = (modalState: boolean) => {
    setCalendar({ ...calendar, modal: modalState });
  };
  // const deadlineChangeHandler = () => {};

  const dispatch = useAppDispatch();
  const { selectedTaskId } = useAppSelector((state) => state.boards);

  const submitChangesHandler = (deadline: string) => {
    dispatch(
      fetchUpdateTask({
        description,
        name,
        deadline,
        taskId: selectedTaskId,
      })
    );
  };

  return (
    <div className="w-1/2  h-full relative">
      <div className="w-full h-14 px-4  absolute bottom-6 flex justify-between items-center">
        {/* Task Info Left */}
        <div className="flex h-full items-center divide-x divide-F4F4F4 divide-x-reverse">
          {/* Creation Date */}
          <div className="h-full pl-8">
            <span className="text-BBBBBB text-xs font-medium">
              ساخته شده در
            </span>
            <p className="text-1E1E1E text-base font-medium">1 اردیبهشت 1402</p>
          </div>
          {/* Timer*/}
          <div className="h-full px-8">
            <span className="text-BBBBBB text-xs font-medium">زمان</span>
            <div className="text-1E1E1E text-base font-medium flex  gap-1">
              <button className="mb-1">
                <GoPlay size={18} fill="green" />
              </button>
              <span className="">00:00:00</span>
            </div>
          </div>
          {/* Deadline */}
          <div className="h-full pr-7 ml-auto">
            <div className="flex gap-2">
              <span className="text-BBBBBB text-xs font-medium">ددلاین</span>
              <BsCalendar3
                onClick={() => handleCalendar(true)}
                className="mb-1 cursor-pointer"
              />
            </div>
            <div className="text-1E1E1E text-base font-medium">
              {deadline
                ? getPersianDateWithOutTime(getGregorianDate(deadline))
                : "تعریف نشده"}
              {/* {deadline} */}
            </div>
          </div>
        </div>
        {/* Watchers */}
        <div>
          <Watchers />
        </div>
      </div>

      {/* Closing window */}
      <span onClick={handleCloseTaskInfo}>
        <CloseIcon classes={"absolute left-3 top-2 text-BDBDBD"} />
      </span>
      {calendar.modal &&
        createPortal(
          <QuckCalendar
            submitChangesHandler={submitChangesHandler}
            handleCalendar={handleCalendar}
          />,
          document.body
        )}
    </div>
  );
};

export default TaskInfoHeaderLeft;
