package com.hospital.hospitalbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.hospitalbackend.model.Patient;

public interface PatientRepository
        extends JpaRepository<Patient, Integer> {
}
