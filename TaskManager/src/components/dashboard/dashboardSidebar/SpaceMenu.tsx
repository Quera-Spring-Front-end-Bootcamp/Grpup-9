type SpaceMenuProps = {
  workSpaces: string[];
};

const SpaceMenu = ({ workSpaces }: SpaceMenuProps) => {
  return (
    <select className="p-2 bg-white outline-none focus:ring-1 focus:ring-208D8E  rounded-md mt-7 w-full  font-semibold  "
    >
      <option
        disabled
        selected
        className=" bg-208D8E text-323232 font-semibold"
      >
        ورک اسپیس ها
      </option>
      {workSpaces.map((space) => (
        <option className="font-semibold bg-208D8E hover:text-white" key={space}>
          {space}
        </option>
      ))}
    </select>
  );
};

export default SpaceMenu;
