// This component is responsible for showing the list of issues

import {createSignal, For, Match, onCleanup, Show, Switch} from "solid-js";
import {parseFromNow} from "../utils/timeParser";
import IssueDetail from "./IssueDetail";
import issueStore from "../store/issueStore";
import IssueCloseDialog from "./issueCloseDialog";
import {bg50, beforeBg600} from "../utils/colors";
import NewDetail from "./NewDetail";

function Issue(props) {
    const [closing, setClosing] = createSignal(false) // <-- Create a signal to track if the issue is closing
    const [editing, setEditing] = createSignal(false) // <-- Create a signal to track if the issue is editing
    const [elapsed, setElapsed] = createSignal(parseFromNow(props.issue.timestamp)) // <-- Get elapsed time from now

    // Update elapsed time every 15 seconds
    let elapsedInterval = setInterval(() => setElapsed(parseFromNow(props.issue.timestamp)), 15000)
    onCleanup(() => clearInterval(elapsedInterval))

    // Close issue to backend
    function closeIssue() {
        issueStore.close(props.issue.id) // <-- Optimistically close the issue
        issueStore.closeIssue(props.issue.id) // <-- Call the API to close the issue
    }

    // Add new detail to backend
    function addDetail(text) {
        // Create a new detail object
        const newDetail = {
            issue_id: props.issue.id,
            note: text,
            operator: "me"
        }
        // Post new detail to backend
        issueStore.postDetail(newDetail)
            .then(() => {
                setEditing(false) // <-- Close the editing mode
            })
            .catch((err) => {
                console.error(err) // <-- Log the error
            })
    }


    return (
        <>
            <section class={`${bg50(props.index)} rounded-md text-gray-800`}>
                <div class="container my-4 max-w-md px-2 py-4 mx-auto">
                    <div class="grid gap-4 mx-4 sm:grid-cols-12">
                        <div class="col-span-12 sm:col-span-3">
                            {/*Title*/}
                            <div
                                class={`text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 ${beforeBg600(props.index)}`}>
                                <h3 class="text-3xl font-semibold first-letter:uppercase">{props.issue.title}</h3>
                                <span
                                    class="text-sm font-bold tracking-wider uppercase text-gray-600">{props.issue.operator}</span>
                                <button class={`btn ${closing() ? undefined : 'btn-outline'} btn-primary mt-6`}
                                        onClick={() => {
                                            setClosing(!closing())
                                            setEditing(false)
                                        }}>Chiudi
                                </button>
                                <button class={`btn ${editing() ? undefined : 'btn-outline'} btn-secondary gap-2 mt-3`}
                                        onClick={() => {
                                            setEditing(!editing())
                                            setClosing(false)
                                        }}>Nuovo
                                </button>
                            </div>
                        </div>
                        <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                            {/*Update cycle*/}
                            <div
                                class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-2 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
                                {/*Switch between edit and close*/}
                                <Switch>
                                    <Match when={closing()} keyed>
                                        <IssueCloseDialog okCallback={closeIssue} koCallback={setClosing}/>
                                    </Match>
                                    <Match when={editing()} keyed>
                                        <NewDetail addDetail={addDetail}/>
                                    </Match>
                                </Switch>
                                {/*Update detail*/}
                                <div class={`transition-all duration-500 ${closing() || editing() ? 'blur-sm' : undefined}`}>
                                    <div
                                        class={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${beforeBg600(props.index)}`}>
                                        <h3 class="text-xl font-semibold tracking-wide">{props.issue.operator} </h3>
                                        <time class="text-xs tracking-wide uppercase text-gray-600">{elapsed()}</time>
                                        <p class="mt-3">{props.issue.note}</p>
                                    </div>

                                    <For each={props.issue.detail}>
                                        {detail => (
                                            <IssueDetail detail={detail} index={props.index}/>
                                        )}
                                    </For>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Issue;