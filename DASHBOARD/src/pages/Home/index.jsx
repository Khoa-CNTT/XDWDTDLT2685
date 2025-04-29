import Chart from "../../components/Chart";
import TotalAll from "../../components/Total";

function Home() {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Trang chủ</h1>
            </div>
            <TotalAll />
            <Chart />
        </div>
    );
}
export default Home;
