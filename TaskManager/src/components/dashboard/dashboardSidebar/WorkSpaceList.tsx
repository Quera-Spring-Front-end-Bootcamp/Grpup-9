import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";

type WorkSpaceProps = {
  spaceList: {
    spaceName: string;
    projectName?: string[];
    spaceColor: string;
  }[];
};

const WorkSpaceList = ({ spaceList }: WorkSpaceProps) => {
  const [workspaceMore , setWorkspaceMore] = useState(false)
  return (
    <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
      {spaceList.map((space) => {
        return (
          <div className="collapse" key={space.spaceName}>
            <input type="checkbox" className="p-0 m-0" />
            <div className="relative collapse-title font-medium flex gap-2 p-0 m-0">
              <span className={`w-5 h-5 rounded ${space.spaceColor}`} />
              {space.spaceName}
              <span onClick={()=> setWorkspaceMore(true)}><BsThreeDots /></span>
              {workspaceMore && <SideMore sideMoreState="ورک اسپیس"/>}
            </div>
            {space.projectName && (
              <div className="collapse-content  ">
                {space.projectName.map((project) => (
                  <p className="pb-3  font-medium" key={project}>
                    {project}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WorkSpaceList;
