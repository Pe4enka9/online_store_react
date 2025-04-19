export default function Loader({loading}) {
    return (
        <div className={`loader-container ${loading ? 'active' : ''}`}>
            <div className="loader"></div>
        </div>
    )
}