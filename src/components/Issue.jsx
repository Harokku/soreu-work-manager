// This component is responsible for showing the list of issues

import {createSignal, For, onCleanup} from "solid-js";
import {parseFromNow} from "../utils/timeParser";
import IssueDetail from "./IssueDetail";
import issueStore from "../store/issueStore";

function Issue(props) {
    const [elapsed, setElapsed] = createSignal(parseFromNow(props.issue.timestamp)) // <-- Get elapsed time from now

    // Update elapsed time every 15 seconds
    let elapsedInterval = setInterval(() => setElapsed(parseFromNow(props.issue.timestamp)), 15000)
    onCleanup(() => clearInterval(elapsedInterval))

    // Close issue to backend
    function closeIssue() {
        issueStore.closeIssue(props.issue.id) // <-- Optimistically close the issue
        issueStore.doCloseIssue(props.issue.id) // <-- Call the API to close the issue
    }



    return (
        <>
            <section className="bg-gray-100 text-gray-800">
                <div className="container my-4 max-w-md px-2 py-4 mx-auto">
                    <div className="grid gap-4 mx-4 sm:grid-cols-12">
                        <div className="col-span-12 sm:col-span-3">
                            {/*Title*/}
                            <div
                                className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-600">
                                <h3 className="text-3xl font-semibold first-letter:uppercase">{props.issue.title}</h3>
                                <span
                                    className="text-sm font-bold tracking-wider uppercase text-gray-600">{props.issue.operator}</span>
                                <button className="btn btn-outline btn-primary mt-6"
                                        onClick={() => closeIssue()}>Chiudi
                                </button>
                            </div>
                        </div>
                        <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                            {/*Update cycle*/}
                            <div
                                className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-2 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
                                {/*Update detail*/}
                                <div
                                    className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600">
                                    <h3 className="text-xl font-semibold tracking-wide">{props.issue.operator} </h3>
                                    <time className="text-xs tracking-wide uppercase text-gray-600">{elapsed()}</time>
                                    <p className="mt-3">{props.issue.note}</p>
                                </div>

                                <For each={props.issue.detail}>
                                    {detail => (
                                        <IssueDetail detail={detail}/>
                                    )}
                                </For>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Issue;