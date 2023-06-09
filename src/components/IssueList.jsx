// This component is responsible for showing related category issue list

import Issue from "./Issue";
import issueStore from "../store/issueStore";
import {For} from "solid-js";

function IssueList(props) {

    const {issues} = issueStore

    return (
        <>
            {/*In case of error, show a message to client*/}
            {issues.error && <div>Error: {issues.error.message}</div>}

            {/*If issues is available show issue list*/}
            {issues.status === "resolved" && (
                <div className="flex-col">
                    <For each={props.category}>{(issue) =>
                        <Issue issue={issue} index={props.index}/>
                    }
                    </For>
                </div>
            )}

            {/*If issues is loading, show a banner*/}
            {issues.status === "pending" &&
                <div className="alert alert-info shadow-lg absolute bottom-0">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             class="stroke-current flex-shrink-0 w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Loading issues from server...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default IssueList