import Header from "../dashboardColumnView/Header";
import TaskCard from "./TaskCard";

type BoardProps = {
  title: string;
  borderColor: string;
  number: string;
};
const Board = ({ title, borderColor, number }: BoardProps) => {
  return (
    <div className="min-w-[250px] h-fit max-h-[80vh] overflow-y-auto flex-shrink scrollbar-none pb-16">
      {/* Sticky Header */}

      <Header title={title} borderColor={borderColor} number={number} />
      {/* Task Cards */}
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default Board;
