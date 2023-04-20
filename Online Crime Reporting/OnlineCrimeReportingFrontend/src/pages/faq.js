const Faq=()=>{

    return(
        <div className="row" style={{marginTop:50}}>
            <div className="col-3"></div>
            <div className="col-6" style={styles.container}>  
                <section>
                <div>
                <h3 className="title" style={{textAlign:'center'}}>FAQ's - Loudspeaker</h3><hr/>
                <p>1) Do I need permission for using loud speakers?</p>
               <p>Ans: Yes. You should obtain permission from concerned C.P/ S.P./ District Magistrate for sound 
                amplification under rules made under sec 33 of B.P.Act,1951.Such a permission is required to 
                be taken for private/ public functions held in private / public places.</p>
                <br/>
                <p>2) Do I need license for public show of cinema?</p>
               <p>Ans: Yes. You have to obtain a temporary performance license from concerned licensing authority (C.P./D.M.).</p>
               <br/>
                <p>3) Do I need license/ permission for dramatic/mimetic/musical performances?</p>
               <p>Ans: Yes. You have to obtain a temporary performance/premises license from concerned licensing authority (C.P./D.M.).</p>
               <br/>
                <p>4) Do I need to take permission for organizing a morcha/dharna/public meeting or rally?</p>
               <p>Ans: Yes. You need to take permission for taking out a morcha/ dharna/ organising public meeting or 
                rallies from concerned Commissioner of Police or District Magistrate.</p>
                <p>5) Do I need a license for consumption / possession of Liquor?</p>
               <p>Ans: Yes, you need to take license for consumption / possession of Liquor from concerned Commissioner of Police 
                or District Magistrate.</p>
                </div>
                </section>  
                <section>
                <div>
                <h3 className="title" style={{textAlign:'center'}}>FAQ's - Passport</h3><hr/>
                <p>1) What is a Passport?</p>
               <p>Ans: "Passport" is an official document, issued by competent authority on behalf of a sovereign nation state, certifying the holders identity and nationality, 
                & authorizing the holder to travel abroad.</p>
                <br/>
                <p>2) Where is the passport application form available?</p>
               <p>Ans: Passport application forms are available at Regional Passport Offices. They are also available at http://passport.nic.in</p>
               <br/>
                <p>3) What is the procedure if the passport is lost?</p>
               <p>Ans: A complaint should be lodged in the concerned local police station and thereafter, an application for a new passport should be submitted.</p>
               <br/>
               <p>4) How many days are required for police verification?</p>
               <p>Ans: The verification procedure takes about 3 weeks from the receipt of the application.</p>
               <br/>
               <p>5) What are the documents required to apply for a passport ?</p>
               <p>Ans: Attach two copies of the following documents:
1. Applicant's Ration Card or any of the following documents.
a) Telephone Bill.
b) Electricity Bill.
c) Bank Account Passbook.
d) Election Card.
e) Letter from the Society on letterhead.
f) NOC from the department if applicant is a Government servant.
2. Proof of date of birth : School leaving certificate / Birth certificate.
3. Citizenship documents (If applicant is citizen of India by registration or naturalization).
4. If the applicant does not reside on the present address for the last one year, an additional set of personal particulars form for each additional place of residence is required.
5. Colour Photographs (frontal view).
6. Two photographs are required for verification at the local police station.</p>
                </div>
                </section>
                <section>
                <div>
                <h3 className="title" style={{textAlign:'center'}}>FAQ's - F.I.R. / N.C. / COMPLAINT / COGNIZANCE</h3><hr/>
                <p>1) What is an F.I.R ?</p>
               <p>Ans: F.I.R. means First Information Report, made to police, about commission of a cognizable offence, In effect, it amounts to putting law in to motion by giving information relating to the commission of a cognizable offence to anofficer in charge of a police station,
                 (which shall be reduced into writing and read over tothe informant) and shall be signed by the person giving such information.
It is mandatory to give a copy of the first information report (as recorded by police) to the complainant or informant free of cost.</p>
                <br/>
                <p>2) How do I lodge F.I.R.?</p>
               <p>Ans: The informant/ complainant should go to the police station having jurisdiction over the area (where the offence is committed) and report to officer in-charge/ station house officer about commission of a 
                cognizable offence. In case information is given on telephone, the informant / complainant should subsequently go to the police station for registration of F.I.R.</p>
               <br/>
                <p>3) What is a Non cognizable offence ?</p>
               <p>Ans: Non cognizable offence means in which a police officer has no authority to arrest without warrant.
                </p>
                <br/>
                <p>4) How do I lodge a NC complaint ?</p>
               <p>Ans: Information about such offences is to be given in a similar manner as explained under F.I.R.. The officer in-charge would reduce the complaint in writing (about commission of Non cognizable offence ) and give a copy thereof to the complainant free of cost.
No police officer can investigate a non-cognizable case unless he obtains prior permission of a Magistrate having power to try such case.</p> 
               <br/>
                <p>5)  What is meant by a ‘complaint’ ?</p>
               <p>Ans: Complaint means any allegation made orally or in writing to a Magistrate, with a view to his taking action under the code of criminal procedure (1973), that some person (whether known or unknown), has committed an offence.</p>
                <p>6) What is meant by public place ?</p>
               <p>Ans: Public place includes (and means) the foreshore, the precincts of every public building or monument, and all place accessible to the public for drawing water, washing or bathing or for the purpose of recreation.
 [B.P.Act 1951, sec 2(13) ]</p>
               

                </div>
                </section>               
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
export default Faq