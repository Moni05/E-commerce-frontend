import Chart from "../../../component/adminPanel/chart/Chart";
import FeaturedInfo from "../../../component/adminPanel/featuredInfo/FeaturedInfo";
import "./adminhome.css";
import WidgetSm from "../../../component/adminPanel/widgetSm/WidgetSm";
import WidgetLg from "../../../component/adminPanel/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../../requestMethod";
import Topbar from "../../../component/adminPanel/topbar/Topbar";
import Sidebar from "../../../component/adminPanel/sidebar/Sidebar";


export default function AdminHome() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <div className="home">
        <FeaturedInfo />
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </div>
    </>
  );
}