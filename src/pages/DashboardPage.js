import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [user, setUser] = useState({});
  useEffect(()=>
    {async function getUserInfo () {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/getUserInfo",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }
  getUserInfo();
  },[]);

  return (
    <div className="container">
      <h2>Welcome to the Dashboard</h2>
      <p>This is a protected page accessible only to logged-in users.</p>
      <h3>{user.name}</h3>
      <h4>{user.email}</h4>
      <h4>{user.role}</h4>
    </div>
  );
};

export default DashboardPage;
