package com.hospital.hospitalbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospitalbackend.model.Patient;
import com.hospital.hospitalbackend.service.PatientService;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService service;

    // ADD
    @PostMapping
    public Patient addPatient(
            @RequestBody Patient patient
    ) {
        return service.addPatient(patient);
    }

    // VIEW ALL
    @GetMapping
    public List<Patient> getAllPatients() {
        return service.getAllPatients();
    }

    // SEARCH
    @GetMapping("/{id}")
    public Patient getPatient(
            @PathVariable int id
    ) {
        return service.getPatientById(id);
    }

    // UPDATE STATUS
    @PutMapping("/{id}")
    public Patient updateStatus(
            @PathVariable int id,
            @RequestBody Patient updatedPatient
    ) {
        return service.updatePatient(
                id,
                updatedPatient
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deletePatient(
            @PathVariable int id
    ) {

        service.deletePatient(id);

        return "Patient Deleted";
    }
}