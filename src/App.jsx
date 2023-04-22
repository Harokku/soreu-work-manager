// import {ws} from "./ws" // import the websocket
import IssueGrid from "./components/IssueGrid";
import issueStore from "./store/issueStore";
import {onMount} from "solid-js"; // import the store

function App() {
    onMount(() => {
        issueStore.fetchData(); // fetch the issues on mount
    })

    return (
        <div>
            <button onClick={() => issueStore.refetch()}>refetch</button>
            <button onClick={() => issueStore.close('4a9e603f-12a7-467f-9d2d-6cd1124ba978')}>Close</button>
            <button onClick={() => issueStore.addIssue({
                operator: "j.doe",
                priority: 2,
                title: "Trauma",
                note: "altre note",
                category: "flotta"
            })}>Add issue
            </button>
            <button onClick={() => issueStore.addDetail({
                "id": "988e29ad-5826-411d-a56e-f24b1b3f7622",
                "issue_id": "047a6e7e-51f2-419b-903c-1956a37d5604",
                "timestamp": "2023-03-29T21:46:21.236689Z",
                "operator": "p.izzul",
                "note": "Il cornetto era al pistacchio",
                "address": "127.0.0.1"
            })}>Add detail
            </button>
            <pre>{JSON.stringify(issueStore.issues, null, 2)}</pre>
            <hr/>
            <pre>{JSON.stringify(issueStore.issuesPerCategory(), null, 2)}</pre>
            {/*<IssueGrid/>*/}
        </div>
    );
}

export default App;
