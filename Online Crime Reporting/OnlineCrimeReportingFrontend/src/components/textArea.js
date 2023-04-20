//since we had Input but with fixed 1 row to write, we wish to provide the user
//more no.of lines to write in short description hence to make a text area with multiple lines
const TextArea=(props)=>{
    const {title, lines, onChange}=props
    return(
        <div className="mb-3">
            <label>{title}</label>
            <textarea onChange={onChange} rows={lines} className="form-control" style={{resize:'none'}}></textarea>
        </div>
    )
}
export default TextArea


