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

    // TODO: implement
    // Add issue to data array
    const addIssue = (issue) => {

    }

    // TODO: implement
    // Add detail to data array
    const addDetail = (detail) => {

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
        return await response.json()
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
        return await response.json()
    }

    // --------------------
    // --- Solid Store ---

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