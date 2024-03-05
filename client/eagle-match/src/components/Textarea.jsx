function Textarea({ label, id, error, ...props}) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <textarea id={id} {...props} />
            <div className="control-error">
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}

export default Textarea;