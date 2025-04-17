export default function Input({label, type, name, id, value, onChange, error, placeholder = ''}) {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} value={value} onChange={onChange} placeholder={placeholder}/>
            {error && <p className="error">{error}</p>}
        </div>
    )
}