import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

const WidgetSm = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/getall", {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODQwYWM1ZGE5ZGYyNzFjOGRjZjQ4NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODIwMjkwMywiZXhwIjoxNjg4NjM0OTAzfQ.XdFWULUTKSB8CVJe1a_hkotgNS5uWbJk4bwUpmcBmtQ",
          },
        });

        console.log(res.data.users);

        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  console.log("Users: ",users)

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users && users.length && users.map((user) => (
          <li className="widgetSmListItem">
            <img
              src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
              <span className="widgetSmUserTitle">Software Engineer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
