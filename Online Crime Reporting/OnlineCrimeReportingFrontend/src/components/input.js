const Input=(props)=>{
const {title, type,onChange,placeholder}=props
return(
    <div className="mb-3">
        <label>{title}</label>
        <input onChange={onChange} type={type ? type : 'text'} className="form-control" placeholder={placeholder}/>
    </div>
)
}
export default Input