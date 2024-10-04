import BarChart from "../components/ui/chart/BarChart";
import LineChart from "../components/ui/chart/LineChart";
import SelectDate from "../components/ui/filter/SelectDate";

import { useSelector } from "react-redux";

function DashboardPage() {
  const date = useSelector((state) => state.chartFilter.date);
  return (
    <>
      <SelectDate />
      <div className="flex flex-col gap-6 ">
        <LineChart categories={date} />
        <BarChart categories={date} />
      </div>
    </>
  );
}

export default DashboardPage;
