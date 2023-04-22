import {createRoot} from "solid-js";
import {createStore, produce} from "solid-js/store";
import {dividePerCategory} from "./utils";

function createIssueStore() {

    // -------------------------
    // --- Fetch data from API ---

    const backend = import.meta.env.VITE_BACKEND_URL; // <-- Get backend URL from .env file
    let controller = null; // <-- Create AbortController

    // Fetch issues from API
    const fetchIssues = async () => {
        setIssues({status: "pending"})
        controller = new AbortController(); // <-- Instantiate new AbortController
        const response = await fetch(`${backend}/issue?mode=full`);
        // check if response is not ok
        if (!response.ok) {
            throw new Error(`HTTP fetchIssues error! status: ${response.status}`); // <-- throw error
        }
        controller = null // <-- reset the AbortController
        return await response.json(); // <-- return json data
    }

    // Cancel fetch request
    const cancelFetch = () => {
        if (controller) controller.abort(); // <-- Abort fetch request
    }

    //  Post issue to backend
    const postIssue = async (issue) => {
        const response = await fetch(`${backend}/issue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issue)
        })
        // Check if response is not ok
        if (!response.ok) {
            throw new Error(`HTTP postIssue error! status: ${response.status}`); // <-- throw error
        }
        return await response.json()
    }

    // Close issue to backend
    const closeIssue = async (id) => {
        const response = await fetch(`${backend}/issue/close/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Check if response is not ok
        if (!response.ok) {
            throw new Error(`HTTP closeIssue error! status: ${response.status}`); // <-- throw error
        }
        return await response.json()
    }


    // -------------------------
    // --- Solid Store ---
    const [issues, setIssues] = createStore({
        status: "unresolved",
        data: [],
        error: null,
    })

    // Fetch issues from API
    const fetchData = () => {
        fetchIssues()
            .then(data =>
                setIssues({status: "resolved", data: data.data, error: null})
            )
            .catch(error => {
                setIssues({status: "rejected", data: [], error: error.message})
            })
    }

    // Re fetch issues from API
    const refetch = () => {
        cancelFetch(); // <-- Cancel fetch request
        fetchData(); // <-- Fetch issues from API
    }

    // Add issue to the store
    const addIssue = (issue) => {
        // add issue to data array
        setIssues('data', item => [...item, issue]);
    }

    // Add detail to the store
    const addDetail = (detail) => {
        // add detail to data array
        // search issue index with id = detail.issue_id
        const index = issues.data.findIndex(item => item.id === detail.issue_id);
        // if issue have no details, create details array and append new detail
        if (!issues.data[index].detail) {
            setIssues('data', index, 'detail', [detail])
        } else {
            // else append new detail to details array
            setIssues('data', index, 'detail', item => [...item, detail])
        }
    }

    // Close issue in the store
    const close = (id) => {
        // set item with id = id to undefined
        setIssues('data', item => item.filter(item => item.id !== id));
    }

    // -------------------------
    // --- Computed values ---

    // aggregate issues per category
    const issuesPerCategory = () => {
        // check if fetch is resolved
        if (issues.status === "resolved") {
            // divide issues per category
            return dividePerCategory(issues.data);
        } else {
            return {};
        }
    }


    return {
        issues,
        issuesPerCategory,
        fetchData,
        refetch,
        closeIssue,
        addIssue,
        addDetail,
        close,
    }
}

export default createRoot(createIssueStore);