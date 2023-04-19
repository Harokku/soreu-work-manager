import {createResource, createRoot, createMemo} from "solid-js"
import {dividePerCategory} from "./utils"

function createIssueStore() {

    // --------------------
    // --- Backend API ---

    // Fetch data from API
    const fetchIssues = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/issue?mode=full`)
        return response.json()
    }

    // Post issue to backend
    const doPostIssue = async (issue) => {
        // Post data to API
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/issue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issue)
        })
        return response.json()
    }

    // Close issue to backend
    const doCloseIssue = async (id) => {
        // Put data to API
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/issue/close/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    }

    // --------------------
    // --- Solid Store ---

    // TODO: implement
    // Add issue to data array
    const addIssue = (issue) => {
        let newIssue = data();  // <-- get actual data from getter
        // if data is not yet loaded, create empty array
        if (!newIssue.data) {
            newIssue["data"] = [];
        }
        newIssue["data"] = [...newIssue.data, issue]; // <-- add new issue to data array
        mutate({...newIssue}); // <-- mutate data optimistically
        //postIssue(issue)
        // refetch() // <-- refetch data from backend
    }

    // TODO: implement
    // Add detail to data array
    const addDetail = (detail) => {
        let issue = data(); // <-- get actual data from getter
        // search for issue with id=detail.issue_id
        let issueIndex = issue.data.findIndex((item) => item.id === detail.issue_id);
        // if issue have no detail, create empty array
        if (!issue.data[issueIndex].detail) {
            issue.data[issueIndex].detail = []
        }
        // if issue is found, add detail to issue
        if (issueIndex !== -1) {
            issue.data[issueIndex].detail = [...issue.data[issueIndex].detail, detail];
            mutate({...issue}); // <-- mutate data optimistically
        }
        // refetch() // <-- refetch data from backend
    }

    // Close issue locally
    const closeIssue = (id) => {
        // remove item with id=id from data array
        let issue = data() // <-- get actual data from getter
        issue.data = issue.data.filter(item => item.id !== id) // <-- remove item
        mutate({...issue}) // <-- mutate data optimistically
    }

    const [data, {mutate, refetch}] = createResource(fetchIssues) // <-- createResource

    // aggregate data per category
    const aggregatedData = createMemo(() => {
        const issues = data()
        // check if issue.data exist
        if (issues) {
            return dividePerCategory(issues.data) // <-- dividePerCategory
        } else
            return {} // <-- return empty object
    })

    // export data and functions
    return {
        data,
        aggregatedData,
        refetch,
        addIssue,
        addDetail,
        doPostIssue,
        doCloseIssue,
        closeIssue,
    }
}

export default createRoot(createIssueStore)