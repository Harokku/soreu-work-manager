//import {ws} from "./ws" // import the websocket
import issues from "./store/issueStore"
import IssueList from "./components/IssueList"; // import the store

function App() {
    return (
        <div>
            <IssueList category="self"/>
            <hr/>
            <div>Filtered data
                <p>{issues.data.state}</p>
                <pre>{JSON.stringify(issues.aggregatedData(), null, 2)}</pre>
            </div>
        </div>
    );
}

export default App;
