/*
 * package com.app.testers; import static java.time.LocalDate.parse; import
 * java.util.Scanner;
 * 
 * import org.springframework.beans.factory.annotation.Autowired;
 * 
 * import com.app.dto.ComplaintDTO; import com.app.entities.CaseType; import
 * com.app.entities.Complaint; import com.app.entities.MissingPerson; import
 * com.app.entities.PoliceStation; import com.app.entities.RelationWithVictim;
 * import com.app.entities.StatusOfComplaint; import
 * com.app.entities.StolenVehicle; import com.app.entities.TypeOfCase; import
 * com.app.entities.User; import com.app.entities.VehicleType; import
 * com.app.service.ComplaintServiceImpl; import
 * com.app.service.IComplaintService; import
 * com.app.service.IPoliceStationService; import
 * com.app.service.PoliceStationServiceImpl;
 * 
 * public class AddComplaintTest {
 * 
 * //dep IComplaintService // @Autowired // private static IComplaintService
 * complaintService; // @Autowired // private static IPoliceStationService
 * psService; private static ComplaintServiceImpl complaintService; private
 * static PoliceStationServiceImpl psService; private static ComplaintDTO
 * dtoReqObj; private static StolenVehicle stolenvehicle; private static
 * CaseType caseType; private static PoliceStation policeStation; private static
 * MissingPerson missingPerson; private static User regtdUser;
 * 
 * 
 * public static void main(String[] args) { Scanner sc=new Scanner(System.in);
 * 
 * regtdUser=new User();
 * 
 * System.out.
 * println("Enter: Date of Complaint,pattern = yyyy-MM-dd),Dateof crime,Victim name, suspect,location, mob no"
 * ); dtoReqObj=new ComplaintDTO();
 * dtoReqObj.setReportingDate(parse(sc.next()));
 * dtoReqObj.setCrimeDate(parse(sc.next()));
 * dtoReqObj.setVictimName(sc.next());dtoReqObj.setSuspect(sc.next());dtoReqObj.
 * setLocation(sc.next());dtoReqObj.setMobileNo(sc.next()); //CaseTpe to take as
 * i/p
 * System.out.println("Select the case type: 1.Stolen Vehicle 2.Missing Person"
 * ); int choice=sc.nextInt(); if(choice==1) { caseType=new
 * CaseType(TypeOfCase.MVT);
 * System.out.println("reg No, Company Name,Chassis No, model, vehicleType");//
 * complaintID(complaint FK ref) is pending, to add stolenvehicle=new
 * StolenVehicle(sc.next(),sc.next(),sc.next(),sc.next(),VehicleType.valueOf(sc.
 * next().toUpperCase()),null) ;
 * 
 * } else {//choice=2 caseType=new CaseType(TypeOfCase.MCP);
 * System.out.println("Name, Age, gender, Height, "); missingPerson=new
 * MissingPerson(sc.next(),sc.nextInt(),sc.next(),sc.nextDouble(),null); }
 * sc.nextLine(); System.out.println("enter the description:");
 * dtoReqObj.setDescription(sc.nextLine());
 * 
 * System.out.println("enter the relation with vicitim");
 * dtoReqObj.setRelationWithVictim(RelationWithVictim.valueOf(sc.next().
 * toUpperCase())); dtoReqObj.setComplaintStatus(StatusOfComplaint.PENDING);
 * 
 * dtoReqObj.setCaseType(caseType);
 * //System.out.println("Enter the Police Station ID:");
 * //policeStation=psService.findById(sc.nextLong());
 * dtoReqObj.setPoliceStation(null);//(policeStation)
 * 
 * dtoReqObj.setComplainant(null); complaintService=new ComplaintServiceImpl();
 * Complaint complaint=complaintService.addComplaint(dtoReqObj);
 * System.out.println(complaint); if(choice==1)
 * {stolenvehicle.setRegComplaint(complaint);
 * System.out.println(stolenvehicle.getId()+"  "+stolenvehicle.getRegComplaint()
 * .getComplainant().getName());} else
 * {missingPerson.setRegComplaint(complaint);System.out.println(missingPerson.
 * getId()+"  "+missingPerson.getRegComplaint().getComplainant().getName());}
 * 
 * }
 * 
 * }
 */