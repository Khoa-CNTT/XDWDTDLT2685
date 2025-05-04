import { handlePrintReport } from "../../util/export";
import icons from "../../util/icon";
const { FaPrint, MdEmail } = icons;
function ToolReport({ item, type }) {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => handlePrintReport(item, type)}
                    className="flex items-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                    <FaPrint className="mr-2" />
                    In hóa đơn
                </button>
                <button className="flex items-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600">
                    <MdEmail className="mr-2" />
                    Gửi email
                </button>
            </div>
        </>
    );
}
export default ToolReport;
