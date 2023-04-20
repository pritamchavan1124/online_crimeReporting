const ContactUs=()=>{

    return(
        <div className="row" style={{marginTop:50}}>
            <div className="col-3"></div>
            <div className="col-6" style={styles.container}>  
                <p style={{textAlign:'center'}}>
                <h2>Women Helpline : 1091</h2>
                <h2>Main Control Room:100</h2>
                <h2>Elder Line : 1098</h2>
                </p>
            </div>
            <div className="col-3"></div>
        </div>
    )
}
const styles={
    
    container: {
        padding: 20,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        borderColor: '#795da3',
        borderRadius: 10,
        broderWidth: 1,
        borderStyle: 'solid',
        boxShadow: '1px 1px 20px 5px #C9C9C9',
      },

}
export default ContactUs