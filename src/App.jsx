import {ws} from "./ws" // import the websocket
import IssueGrid from "./components/IssueGrid";
import issueStore from "./store/issueStore"; // import the store

function App() {
    return (
        <div>
            <IssueGrid/>
        </div>
    );
}

export default App;
