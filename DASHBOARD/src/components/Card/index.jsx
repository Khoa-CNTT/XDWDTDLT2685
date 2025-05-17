import icons from "../../util/icon";
const { MdTrendingDown, MdTrendingUp } = icons;
function Card({ icon, title, value, percentage, valueClass = "text-slate-900 dark:text-slate-50" }) {
    // Determine the icon based on percentage change
    const TrendIcon = percentage > 0 ? MdTrendingUp : MdTrendingDown;

    return (
        <div className="card">
            <div className="card-header">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-[#019fb5] transition-colors dark:bg-blue-600/20 dark:text-[#019fb5]">
                    {icon}
                </div>
                <p className="card-title">{title}</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
                {/* <span className="border-[#019fb5] flex w-fit items-center gap-x-2 rounded-full border px-2 py-1 font-medium text-[#019fb5] dark:border-[#019fb5] dark:text-[#019fb5]">
                    <TrendIcon size={20} />
                    <span>{percentage}%</span>
                </span> */}
            </div>
        </div>
    );
}
export default Card;
