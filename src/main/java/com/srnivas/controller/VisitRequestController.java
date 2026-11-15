package com.srnivas.controller;

import com.srnivas.model.VisitRequest;
import com.srnivas.repository.VisitRequestRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Answers the browser at /api/visits
@RestController
@RequestMapping("/api/visits")
public class VisitRequestController {

    private final VisitRequestRepository repository;

    public VisitRequestController(VisitRequestRepository repository) {
        this.repository = repository;
    }

    // Contact form sends here -> saved into MySQL
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VisitRequest save(@Valid @RequestBody VisitRequest visit) {
        return repository.save(visit);
    }

    // Open http://localhost:8080/api/visits to see all messages
    @GetMapping
    public List<VisitRequest> all() {
        return repository.findAllByOrderByCreatedAtDesc();
    }
}
