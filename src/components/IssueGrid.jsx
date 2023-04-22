import {createMemo, For, Show} from "solid-js";
import issueStore from "../store/issueStore";
import IssueList from "./IssueList";

function IssueGrid(props) {
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
            <div className="flex flex-wrap gap-6 mx-6">
                <div>
                    <h1 className="sticky top-0 z-10 bg-violet-300/100 rounded-t-xl text-center uppercase font-semibold text-3xl after:block after:w-24 after:h-3 after:rounded-md after:bg-violet-600 after:mx-auto">Personale</h1>
                    <Show when={issueStore.issuesPerCategory().self} fallback={<div>Nessuna nota personale</div>} keyed>
                        <IssueList category={issueStore.issuesPerCategory().self}/>
                    </Show>
                </div>
                <For each={categories()} fallback={<div>Loading...</div>}>
                    {(category) => (
                        <div>
                            <h1 className="sticky top-0 z-10 bg-violet-300/100 rounded-t-xl text-center uppercase font-semibold text-3xl after:block after:w-24 after:h-3 after:rounded-md after:bg-violet-600 after:mx-auto">{category}</h1>
                            <IssueList category={issueStore.issuesPerCategory()[category]}/>
                        </div>
                    )}
                </For>
            </div>
        </>
    );
}

export default IssueGrid;