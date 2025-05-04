import { BookingProvider } from "../../context/BookingContext";
import GoBack from "../GoBack/Goback";
import DataChartMonth from "./ChartMonth";
import PaymentDataCard from "./Payment";
import TopbookedTour from "./TopBook";
import TourRecent from "./TourRecent";
import TourStatistics from "./TourStatistics";

function Chart() {
    return (
        <>
            <BookingProvider>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                    <TourStatistics />
                    <PaymentDataCard />
                    <TopbookedTour />
                    <TourRecent />
                    <DataChartMonth />
                    <GoBack />
                </div>
            </BookingProvider>
        </>
    );
}
export default Chart;
