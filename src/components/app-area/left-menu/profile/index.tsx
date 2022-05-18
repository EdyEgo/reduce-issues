import ProfileColumn from "./ManageProfileColumn";
import TeamColumn from "./ManageTeamColumn";

interface ProfieProps {}

const Profie: React.FC<ProfieProps> = () => {
  return (
    <>
      <ProfileColumn />
      <TeamColumn />
    </>
  );
};

export default Profie;
