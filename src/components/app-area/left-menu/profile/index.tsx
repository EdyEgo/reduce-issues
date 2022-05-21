import ProfileColumn from "./ManageProfileColumn";
import WorkspaceColumn from "./ManageWorkspaceColumn";

interface ProfieProps {}

const Profie: React.FC<ProfieProps> = () => {
  return (
    <>
      <WorkspaceColumn />
      <ProfileColumn />
    </>
  );
};

export default Profie;
