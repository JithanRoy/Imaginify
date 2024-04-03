import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <>
      <div className="container">Home</div>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default Home;
