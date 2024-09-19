package com.example.PostApet.Repository;

import com.example.PostApet.Model.PetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<PetModel,Integer> {
}
