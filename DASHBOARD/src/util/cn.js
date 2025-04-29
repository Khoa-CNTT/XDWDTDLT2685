import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
//  Hàm cn giúp viết CSS linh hoạt hơn bằng cách hợp nhất và tối ưu các lớp Tailwind một cách tự động.
