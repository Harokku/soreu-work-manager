import {createSignal} from "solid-js";

function NewDetail(props) {
    const [textValue, setTextValue] = createSignal('') // <-- Create a signal to track the text value
    const [enabled, setEnabled] = createSignal(true) // <-- Create a signal to track if the textArea is enabled

    return (
        <div class="flex flex-col items-center justify-evenly">
            <p>Testo consegna + <kbd class="kbd">invio</kbd></p>
            <br/>
            <textarea
                disabled={!enabled()}
                value={textValue()}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        props.addDetail(e.target.value)
                        setTextValue('')
                    } else
                        setTextValue(e.target.value)
                }
                } placeholder="Testo consegna" className="textarea textarea-md textarea-bordered w-full max-w-xs"/>
        </div>
    )
}

export default NewDetail