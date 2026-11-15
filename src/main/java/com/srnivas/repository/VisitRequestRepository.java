package com.srnivas.repository;

import com.srnivas.model.VisitRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Spring writes the SQL for us (save, findAll, delete...).
public interface VisitRequestRepository extends JpaRepository<VisitRequest, Long> {
    List<VisitRequest> findAllByOrderByCreatedAtDesc();
}
