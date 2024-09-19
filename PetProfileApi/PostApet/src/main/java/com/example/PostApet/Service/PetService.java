package com.example.PostApet.Service;

import com.example.PostApet.Model.PetModel;

import java.util.List;

public interface PetService {
   PetModel savePet(PetModel petModel);
   List<PetModel> getAllPets();
   PetModel updatePet(int id, PetModel petModel);
   PetModel getPetById(int id);
   String deletePet(int id);
   PetModel calculateCosts(PetModel petModel);
}
