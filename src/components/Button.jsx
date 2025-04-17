export default function Button({children, onClick, loading = false, type = 'button'}) {
    return <button type={type} className={`btn ${loading && 'disabled'}`} disabled={loading}
                   onClick={onClick}>{children}</button>
}