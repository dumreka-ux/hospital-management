package com.hospital.hospitalbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.hospitalbackend.model.Patient;
import com.hospital.hospitalbackend.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    // ADD
    public Patient addPatient(
            Patient patient
    ) {
        return repository.save(patient);
    }

    // VIEW
    public List<Patient> getAllPatients() {
        return repository.findAll();
    }

    // SEARCH
    public Patient getPatientById(
            int id
    ) {

        Optional<Patient> patient =
                repository.findById(id);

        return patient.orElse(null);
    }

    // UPDATE
    public Patient updatePatient(
            int id,
            Patient updatedPatient
    ) {

        Optional<Patient> existing =
                repository.findById(id);

        if (existing.isPresent()) {

            Patient patient =
                    existing.get();

            patient.setStatus(
                    updatedPatient.getStatus()
            );

            return repository.save(
                    patient
            );
        }

        return null;
    }

    // DELETE
    public void deletePatient(
            int id
    ) {

        repository.deleteById(id);
    }
}