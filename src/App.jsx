import {ws} from "./ws" // import the websocket
import IssueGrid from "./components/IssueGrid";
import issueStore from "./store/issueStore";
import {onMount} from "solid-js"; // import the store

function App() {
    onMount(() => {
        issueStore.fetchData(); // fetch the issues on mount
    })

    return (
        <div>
            <IssueGrid/>
        </div>
    );
}

export default App;
