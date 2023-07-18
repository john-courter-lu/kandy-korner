export const SearchForm = ({ setSearchTerms }) => {
    return <>
        <form className="searchForm">
            <h2 className="searchForm__title">New Search</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">What candy are you looking for?</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter search terms"
                        onChange={
                            (changeEvent) => {
                                setSearchTerms(changeEvent.target.value)
                            }
                        }
                         />
                </div>
            </fieldset>
        </form>
    </>
}