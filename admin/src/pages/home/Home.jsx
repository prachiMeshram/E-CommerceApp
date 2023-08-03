import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/widgetLg";
import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const token = location.state?.token;

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/user/userStats", {
        headers: {
          authorization:
            token,
        },
      });

      // for (const item in res.data) {
      //   if (res.data.hasOwnProperty(item)) {
      //     // console.log(`${key}: ${population[key]}`);
      //     setUserData((prev) => [
      //       ...prev,
      //       { name: monthsArray[item - 1], "Active User": res.data[item] },
      //     ]);
      //   }
      // }

      setUserData(res.data.data)
      // console.log(res);
    };
    fetchData();
    // console.log(userData);
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
