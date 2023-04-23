import {createMemo, For, Show} from "solid-js";
import issueStore from "../store/issueStore";
import IssueList from "./IssueList";
import {afterBg600, bg300} from "../utils/colors";

function IssueGrid() {
    // memoize categories index excluding self
    const categories = createMemo(() => {
        const categories = Object.keys(issueStore.issuesPerCategory());
        // check if category exist
        if (categories) {
            return categories.filter(category => category !== "self"); // <-- filter self
        } else {
            return []; // <-- return empty array
        }
    });

    return (
        <>
            <button class="btn btn-active" onClick={() => issueStore.refetch()}>Refresh</button>
            <div className="flex flex-wrap gap-6 mx-6">
                <div>
                    <h1 className={`sticky top-0 z-10 ${bg300(0)} rounded-t-xl text-center uppercase font-semibold text-3xl after:block after:w-24 after:h-3 after:rounded-md ${afterBg600(0)} after:mx-auto`}>Personale</h1>
                    <Show
                        when={issueStore.issuesPerCategory().self}
                        fallback={
                            <div class="my-2 alert alert-info shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         class="stroke-current flex-shrink-0 w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Nessuna nota personale</span>
                                </div>
                            </div>
                        } keyed>
                        <IssueList category={issueStore.issuesPerCategory().self} index={0}/>
                    </Show>
                </div>
                <For
                    each={categories()}
                    fallback={
                        <div class="absolute bottom-0 left-0 alert alert-info shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     class="stroke-current flex-shrink-0 w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Loading tasks from server</span>
                            </div>
                        </div>
                    }>
                    {(category, i) => (
                        <div>
                            <h1 class={`sticky top-0 z-10 ${bg300(i() + 1)} rounded-t-xl text-center uppercase font-semibold text-3xl after:block after:w-24 after:h-3 after:rounded-md ${afterBg600(i() + 1)} after:mx-auto`}>{category}</h1>
                            <IssueList category={issueStore.issuesPerCategory()[category]} index={i() + 1}/>
                        </div>
                    )}
                </For>
            </div>
        </>
    );
}

export default IssueGrid;