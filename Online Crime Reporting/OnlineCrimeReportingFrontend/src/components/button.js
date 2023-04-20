const Button=(props)=>{
    const {title,onClick}=props
   return(<button onClick={onClick} className="btn btn-primary" style={styles.button}>{title}</button>)
}
const styles={
    button:{
    position: 'relative',    
    width:'100%',
    height:40,
    backgroundColor:'#795da3',
    borderRadius:5,
    border:'none',
    marginTop:10
    }
}
export default Button