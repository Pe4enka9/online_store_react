export default function Button({children, onClick, loading = false, danger = false, type = 'button'}) {
    return <button type={type} className={`btn ${loading ? 'disabled' : ''} ${danger ? 'danger' : ''}`}
                   disabled={loading} onClick={onClick}>{children}</button>
}