package com.example.PostApet.Model;

import jakarta.persistence.*;

@Entity
public class PetModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String petName;
    private String specie;
    private String breed;
    private String location;
    private String age;
    private String gender;
    private String reason;
    private String ifTemp;
    @Lob
    private String justify;
    private String contactEmail;
    private String contactPhoneNumber;
    private String ownerName;
    private String nic;
    private String photo;
    private String regStatus;
    private String physicalStatus;
    private String docName;
    private String docStatus;
    private Double totalCost;
    private Double discount;
    private Double netCost;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getSpecie() {
        return specie;
    }

    public void setSpecie(String specie) {
        this.specie = specie;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getIfTemp() {
        return ifTemp;
    }

    public void setIfTemp(String ifTemp) {
        this.ifTemp = ifTemp;
    }

    public String getJustify() {
        return justify;
    }

    public void setJustify(String justify) {
        this.justify = justify;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhoneNumber() {
        return contactPhoneNumber;
    }

    public void setContactPhoneNumber(String contactPhoneNumber) {
        this.contactPhoneNumber = contactPhoneNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getRegStatus() {
        return regStatus;
    }

    public void setRegStatus(String regStatus) {
        this.regStatus = regStatus;
    }

    public String getPhysicalStatus() {
        return physicalStatus;
    }

    public void setPhysicalStatus(String physicalStatus) {
        this.physicalStatus = physicalStatus;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocStatus() {
        return docStatus;
    }

    public void setDocStatus(String docStatus) {
        this.docStatus = docStatus;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Double getNetCost() {
        return netCost;
    }

    public void setNetCost(Double netCost) {
        this.netCost = netCost;
    }

    // Calculation Methods
    public void calculateTotalCost() {
        // Example implementation of total cost calculation
        if (age != null) {
            try {
                int duration = Integer.parseInt(age); // Assuming age represents the duration in months
                if (duration <= 1) {
                    totalCost = 20000.0;
                } else if (duration <= 6) {
                    totalCost = 60000.0;
                } else if (duration <= 12) {
                    totalCost = 100000.0;
                } else {
                    totalCost = 10000.0;
                }
            } catch (NumberFormatException e) {
                totalCost = 10000.0; // Default cost if parsing fails
            }
        } else {
            totalCost = 10000.0; // Default cost
        }
    }

    public void calculateNetCost() {
        if (totalCost != null && discount != null) {
            netCost = totalCost - (totalCost * discount / 100);
        } else {
            netCost = totalCost;
        }
    }
}
