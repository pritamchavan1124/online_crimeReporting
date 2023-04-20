package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.ComplaintStatisticsDTO;
import com.app.entities.Complaint;


public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

	//add a CustomQuerymethod to get Complaints for specific Complainant
	@Query("select c from Complaint c join c.complainant cm where cm.id=?1")
	List<Complaint> findAllComplaintsByComplainantId(long userId);
	
	//add a CustomQuerymethod to get Complaints for specific PoliceStation
	@Query("select c from Complaint c join c.policeStation cp where cp.id=?1")
	List<Complaint> findAllComplaintsByPoliceStationId(long psId);
	
	//add a CustomQuerymethod to give the no. of reports confirmed By PS
	@Query("select count(*) from Complaint c where c.complaintStatus='INPROCESS' or c.complaintStatus='RESOLVED'")
	long numberOfComplaintsInProcessOrResolved();
	
//	//select ct.ct_type ,count(c.id) as count from complaints c inner join case_types ct on c.case_type_id=ct.id group by ct.ct_type;
	//@Query("select ct.caseType, count(c.id) as count from Complaint c join c.caseTypeSelected ct on c.caseTypeSelected.id=ct.id")
	@Query("select new com.app.dto.ComplaintStatisticsDTO(ct.caseType,count(c.id)) from Complaint c join c.caseTypeSelected ct group by ct.caseType")
	List<ComplaintStatisticsDTO> getComplaintStatistics();
	
	
	
}
