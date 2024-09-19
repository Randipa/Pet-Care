package com.example.PostApet.Controller;

import com.example.PostApet.Model.PetModel;
import com.example.PostApet.Service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/pet")
@CrossOrigin
public class PetController {

    @Autowired
    private PetService petService;

    @PostMapping("/add")
    public String add(@RequestBody PetModel petModel) {
        petService.savePet(petModel);
        return "New pet is added!";
    }

    @GetMapping("/getAll")
    public List<PetModel> getAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/get/{id}")
    public PetModel getPetById(@PathVariable int id) {
        return petService.getPetById(id);
    }

    @PutMapping("/update/{id}")
    public PetModel updatePet(@PathVariable int id, @RequestBody PetModel petModel) {
        return petService.updatePet(id, petModel);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePet(@PathVariable int id) {
        return petService.deletePet(id);
    }

    @PostMapping("/calculate")
    public PetModel calculateCosts(@RequestBody PetModel petModel) {
        return petService.calculateCosts(petModel);
    }
}
