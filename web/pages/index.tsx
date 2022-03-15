import React from "react";
import { useGetManyUsersQuery } from "../src/generated/graphql";

const Home = () => {
  const [result] = useGetManyUsersQuery();

  return (
    <div className="mx-2">
      <h1>Hello World</h1>
      <p>This is the home page.</p>
      {result.data?.GetManyUsers.map((user) => {
        return (
          <div
            className="bg-steel-800 text-steel-100 my-2 py-2 px-2 w-80 rounded-md "
            key={user?.id}
          >
            <h1>{user?.firstName}</h1>
            <p> {user?.email} </p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
