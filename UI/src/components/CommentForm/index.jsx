import { useState } from "react"

function CommentForm({ handleSubmit, submitLabel, hasCancelButton = false, handleCancel, initialText = "" }) {
    const [text, setText] = useState(initialText)
    const isTextareaDisabled = text.length === 0
    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(text)
        setText("")
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button disabled={isTextareaDisabled}>{submitLabel}</button>
            {hasCancelButton && (
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            )}
        </form>
    )
}

export default CommentForm
