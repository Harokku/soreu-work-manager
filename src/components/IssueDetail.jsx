// This component is responsible for showing the list of issues detail

import {createSignal, onCleanup} from "solid-js";
import {parseFromNow} from "../utils/timeParser";
import {beforeBg600} from "../utils/colors";

function IssueDetail(props){
    const [elapsed, setElapsed] = createSignal(parseFromNow(props.detail.timestamp)) // <-- Get elapsed time from now

    // Update elapsed time every 15 seconds
    let elapsedInterval = setInterval(() => setElapsed(parseFromNow(props.detail.timestamp)), 15000)
    onCleanup(() => clearInterval(elapsedInterval))

    return(
        <>
            <div
                className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${beforeBg600(props.index)}`}>
                <h3 className="text-xl font-semibold tracking-wide">{props.detail.operator} </h3>
                <time className="text-xs tracking-wide uppercase text-gray-600">{elapsed()}</time>
                <p className="mt-3">{props.detail.note}</p>
            </div>
        </>
    )
}

export default IssueDetail