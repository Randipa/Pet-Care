package com.example.PostApet.Service;

import com.example.PostApet.Model.PetModel;
import com.example.PostApet.Repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetServiceImpl implements PetService {

    @Autowired
    private PetRepository petRepository;

    @Override
    public PetModel savePet(PetModel petModel) {
        return petRepository.save(petModel);
    }

    @Override
    public List<PetModel> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public PetModel updatePet(int id, PetModel petModel) {
        PetModel existingPet = petRepository.findById(id).orElse(null);
        if (existingPet != null) {
            existingPet.setPetName(petModel.getPetName());
            existingPet.setSpecie(petModel.getSpecie());
            existingPet.setBreed(petModel.getBreed());
            existingPet.setLocation(petModel.getLocation());
            existingPet.setAge(petModel.getAge());
            existingPet.setGender(petModel.getGender());
            existingPet.setReason(petModel.getReason());
            existingPet.setIfTemp(petModel.getIfTemp());
            existingPet.setJustify(petModel.getJustify());
            existingPet.setContactEmail(petModel.getContactEmail());
            existingPet.setContactPhoneNumber(petModel.getContactPhoneNumber());
            existingPet.setOwnerName(petModel.getOwnerName());
            existingPet.setNic(petModel.getNic());
            existingPet.setPhoto(petModel.getPhoto());
            existingPet.setRegStatus(petModel.getRegStatus());
            existingPet.setPhysicalStatus(petModel.getPhysicalStatus());
            existingPet.setDocName(petModel.getDocName());
            existingPet.setDocStatus(petModel.getDocStatus());
            return petRepository.save(existingPet);
        } else {
            return null;
        }
    }

    @Override
    public PetModel getPetById(int id) {
        return petRepository.findById(id).orElse(null);
    }

    @Override
    public String deletePet(int id) {
        PetModel petModel = petRepository.findById(id).orElse(null);
        if (petModel != null) {
            petRepository.deleteById(id);
            return "Pet deleted successfully!";
        } else {
            return "Pet not found!";
        }
    }

    @Override
    public PetModel calculateCosts(PetModel petModel) {
        double totalCost = 10000; // Default cost
        int ageInMonths = Integer.parseInt(petModel.getAge());
        if (ageInMonths <= 1) totalCost = 20000;
        else if (ageInMonths <= 6) totalCost = 60000;
        else if (ageInMonths <= 12) totalCost = 100000;

        double discountValue = petModel.getDiscount() != null ? petModel.getDiscount() : 0;
        double netCost = totalCost - (totalCost * discountValue / 100);

        petModel.setTotalCost(totalCost);
        petModel.setNetCost(netCost);

        return petModel;
    }
}
