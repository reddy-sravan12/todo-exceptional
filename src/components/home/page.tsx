import ProtectedRoute from "../global/protectedRoute/page";

function HomeComp() {
  return <div>Welcome Todo Home!</div>;
}

export default ProtectedRoute(HomeComp);
