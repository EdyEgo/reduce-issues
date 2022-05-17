import { Link } from "react-router-dom";
interface ClientHomeProps {}

const ClientHome: React.FC<ClientHomeProps> = () => {
  return (
    <>
      <div className="hero-container flex justify-center  mt-20">
        <div className="hero-content-container w-7/12 flex flex-col justify-center items-center gap-4 ">
          <div className="first-title-row">
            <div className="first-title text-6xl font-extrabold text-center">
              Reduce your issues with an fun and easy to use tracking tool
            </div>
          </div>
          <div className="second-title-row mt-4">
            <div className="second-title text-2xl font-semibold text-gray-700 text-center">
              Organize your project , create task , labels them in a
              customizable way so you can have a clear overview and an easy
              mind.
            </div>
          </div>
          <div className="action-register-row mt-10">
            <Link
              to="/signup"
              className="sign-up-button-client-area transform-all ease-in-out duration-300  border-0  rounded-md  font-bold text-black text-lg cursor-pointer p-4 "
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientHome;