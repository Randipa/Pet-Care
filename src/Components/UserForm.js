import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'; // Import the CSS file

const UserForm = () => {
    const [pet, setPet] = useState({
        id: '',
        petName: '',
        specie: '',
        breed: '',
        location: '',
        age: '',
        gender: '',
        reason: '',
        ifTemp: '',
        justify: '',
        contactEmail: '',
        contactPhoneNumber: '',
        ownerName: '',
        nic: '',
        photo: '',
        regStatus: '',
        physicalStatus: '',
        docName: '',
        docStatus: '',
        totalCost: 0,
        discount: 0,
        netCost: 0
    });

    const [discount, setDiscount] = useState(0);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPet(prevState => ({ ...prevState, [name]: value }));
    };

    const validateInputs = () => {
        let validationErrors = {};
        if (!pet.petName) validationErrors.petName = "Pet name is required.";
        if (!pet.specie) validationErrors.specie = "Species is required.";
        if (!pet.breed) validationErrors.breed = "Breed is required.";
        if (!pet.location) validationErrors.location = "Location is required.";
        if (!pet.age || pet.age <= 0) validationErrors.age = "Age must be greater than 0.";
        if (!pet.gender) validationErrors.gender = "Gender is required.";
        if (!pet.contactEmail || !/\S+@\S+\.\S+/.test(pet.contactEmail)) validationErrors.contactEmail = "Valid email is required.";
        if (!pet.contactPhoneNumber || !/^[0-9]{10}$/.test(pet.contactPhoneNumber)) validationErrors.contactPhoneNumber = "Valid phone number is required.";
        if (!pet.ownerName) validationErrors.ownerName = "Owner name is required.";
        if (!pet.nic) validationErrors.nic = "NIC is required.";
        if (!pet.ifTemp || isNaN(pet.ifTemp) || pet.ifTemp < 0) validationErrors.ifTemp = "Duration is required and must be a valid number.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; // Returns true if no errors
    };

    const calculateCosts = () => {
        let totalCost = 10000; // Default cost
        const ifTemp = parseInt(pet.ifTemp, 10);
        if (ifTemp <= 1) totalCost = 20000;
        else if (ifTemp <= 2) totalCost = 60000;
        else if (ifTemp <= 3) totalCost = 100000;
        else if (ifTemp <= 4) totalCost = 60000;
        else if (ifTemp <= 5) totalCost = 100000;

        const discountValue = parseFloat(discount);
        const netCost = totalCost - (totalCost * discountValue / 100);

        setPet(prevState => ({
            ...prevState,
            totalCost,
            netCost
        }));
    };

    const resetForm = () => {
        setPet({
            id: '',
            petName: '',
            specie: '',
            breed: '',
            location: '',
            age: '',
            gender: '',
            reason: '',
            ifTemp: '',
            justify: '',
            contactEmail: '',
            contactPhoneNumber: '',
            ownerName: '',
            nic: '',
            photo: '',
            regStatus: '',
            physicalStatus: '',
            docName: '',
            docStatus: '',
            discount: '',
            totalCost: '',
            netCost: ''
        });
        setDiscount(''); // Reset discount radio selection
    };

    const handleSearch = () => {
        if (!pet.id) {
            alert('Pet ID is required for search.');
            return;
        }
        axios.get(`http://localhost:8080/api/v1/pet/get/${pet.id}`)
            .then(response => {
                if (response.data) {
                    setPet(response.data);
                } else {
                    alert('Pet not found!');
                }
            })
            .catch(error => {
                console.error('Error fetching pet details:', error);
                alert('Error fetching pet details.');
            });
    };

    const handleSave = () => {
        if (!validateInputs()) return;
        axios.post('http://localhost:8080/api/v1/pet/add', pet)
            .then(response => {
                alert('Pet added successfully!');
                setPet({
                    id: '',
                    petName: '',
                    specie: '',
                    breed: '',
                    location: '',
                    age: '',
                    gender: '',
                    reason: '',
                    ifTemp: '',
                    justify: '',
                    contactEmail: '',
                    contactPhoneNumber: '',
                    ownerName: '',
                    nic: '',
                    photo: '',
                    regStatus: '',
                    physicalStatus: '',
                    docName: '',
                    docStatus: '',
                    totalCost: 0,
                    discount: 0,
                    netCost: 0
                });
            })
            .catch(error => {
                console.error('Error saving pet:', error);
                alert('Error saving pet.');
            });
    };

    const handleUpdate = () => {
        if (!validateInputs()) return;
        axios.put(`http://localhost:8080/api/v1/pet/update/${pet.id}`, pet)
            .then(response => {
                alert('Pet updated successfully!');
            })
            .catch(error => {
                console.error('Error updating pet:', error);
                alert('Error updating pet.');
            });
    };

    const handleDelete = () => {
        if (!pet.id) {
            alert('Pet ID is required to delete.');
            return;
        }
        axios.delete(`http://localhost:8080/api/v1/pet/delete/${pet.id}`)
            .then(response => {
                alert('Pet deleted successfully!');
                setPet({
                    id: '',
                    petName: '',
                    specie: '',
                    breed: '',
                    location: '',
                    age: '',
                    gender: '',
                    reason: '',
                    ifTemp: '',
                    justify: '',
                    contactEmail: '',
                    contactPhoneNumber: '',
                    ownerName: '',
                    nic: '',
                    photo: '',
                    regStatus: '',
                    physicalStatus: '',
                    docName: '',
                    docStatus: '',
                    totalCost: 0,
                    discount: 0,
                    netCost: 0
                });
            })
            .catch(error => {
                console.error('Error deleting pet:', error);
                alert('Error deleting pet.');
            });
    };

    return (
        <div className="user-form">
            <h2 className="form-title">Pet Profile</h2>
            <div className="search-container">
                <input 
                    type="text" 
                    name="id" 
                    value={pet.id} 
                    onChange={handleInputChange} 
                    placeholder="Pet ID" 
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <form>
                <div className="form-group">
                    <label>Pet Name:</label>
                    <input 
                        type="text" 
                        name="petName" 
                        value={pet.petName} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.petName && <span className="error">{errors.petName}</span>}
                </div>

                <div className="form-group">
                    <label>Species:</label>
                    <input 
                        type="text" 
                        name="specie" 
                        value={pet.specie} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.specie && <span className="error">{errors.specie}</span>}
                </div>

                <div className="form-group">
                    <label>Breed:</label>
                    <input 
                        type="text" 
                        name="breed" 
                        value={pet.breed} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.breed && <span className="error">{errors.breed}</span>}
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={pet.location} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                     {errors.location && <span className="error">{errors.location}</span>}
                </div>

                <div className="form-group">
                    <label>Age (in months):</label>
                    <input 
                        type="number" 
                        name="age" 
                        value={pet.age} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.age && <span className="error">{errors.age}</span>}
                </div>

                <div className="form-group contact-section">
                    <label>Gender:</label>
                    <select 
                        name="gender" 
                        value={pet.gender} 
                        onChange={handleInputChange} 
                        className="controlCont"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <span className="error">{errors.gender}</span>}
                </div>

                <div className="form-group contact-section">
                    <label>Reason:</label>
                    <select 
                        name="reason" 
                        value={pet.reason} 
                        onChange={handleInputChange} 
                        className="controlCont"
                    >
                       
                        <option value="Temporary">Temporary</option>
                        <option value="Adopt">Adopt</option>
                    </select>
                    
                </div>

                <div className="form-group contact-section">
                    <label>Duration:</label>
                    <select 
                        name="ifTemp" 
                        value={pet.ifTemp} 
                        onChange={handleInputChange} 
                        className="controlCont"
                    >
                        <option value="0">None</option>
                        <option value="1">1 month</option>
                        <option value="2">3 month</option>
                        <option value="3">6 months</option>
                        <option value="4">1 year</option>
                        <option value="5">2 year</option>
                    </select>

                    {errors.ifTemp && <span className="error">{errors.ifTemp}</span>}

                </div>

                <div className="form-group">
                    <label>Justify:</label>
                    <input 
                        type="text" 
                        name="justify" 
                        value={pet.justify} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                </div>
                <div className="form-group">
                    <label>Owner Name:</label>
                    <input 
                        type="text" 
                        name="ownerName" 
                        value={pet.ownerName} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.ownerName && <span className="error">{errors.ownerName}</span>}
                </div>

                <div className="form-group">
                    <label>NIC:</label>
                    <input 
                        type="text" 
                        name="nic" 
                        value={pet.nic} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.nic && <span className="error">{errors.nic}</span>}
                </div>

                <div className="form-group">
                    <label>Contact Email:</label>
                    <input 
                        type="email" 
                        name="contactEmail" 
                        value={pet.contactEmail} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.contactEmail && <span className="error">{errors.contactEmail}</span>}
                </div>

                <div className="form-group">
                    <label>Contact Phone Number:</label>
                    <input 
                        type="text" 
                        name="contactPhoneNumber" 
                        value={pet.contactPhoneNumber} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                    {errors.contactPhoneNumber && <span className="error">{errors.contactPhoneNumber}</span>}
                </div>

                

                <div className="form-group photo-upload">
                    <label>Photo:</label>
                    <div className="photo-icon-wrapper">
                        <div className="photo-icon">
                            <i className="fa fa-camera"></i>
                            <input 
                                type="file" 
                                name="photo" 
                                onChange={(e) => setPet({ ...pet, photo: URL.createObjectURL(e.target.files[0]) })} 
                                className="photo-input" 
                            />
                        </div>
                        {pet.photo && <img src={pet.photo} alt="Pet" className="uploaded-photo" />}
                    </div>
                </div>

                
                <div className="form-group contact-section">
                    <label>Physical Status:</label>
                    <select 
                        name="physicalStatus" 
                        value={pet.physicalStatus} 
                        onChange={handleInputChange} 
                        className="controlCont"
                    >
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Doctor Name:</label>
                    <input 
                        type="text" 
                        name="docName" 
                        value={pet.docName} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                </div>

                <div className="form-group">
                    <label>Doctor Status:</label>
                    <input 
                        type="text" 
                        name="docStatus" 
                        value={pet.docStatus} 
                        onChange={handleInputChange} 
                        className="textCombo" 
                    />
                </div>

                <div className="form-group">
                    <label>Discount:</label>
                    <div className="custom-radio">
                        <label>
                            <input 
                                type="radio" 
                                name="discount" 
                                value="5" 
                                onChange={(e) => setDiscount(e.target.value)} 
                            />
                            5%
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="discount" 
                                value="10" 
                                onChange={(e) => setDiscount(e.target.value)} 
                            />
                            10%
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="discount" 
                                value="15" 
                                onChange={(e) => setDiscount(e.target.value)} 
                            />
                            15%
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <button 
                        type="button" 
                        className="save-continue-btn" 
                        onClick={calculateCosts}
                    >
                        Calculate
                    </button>
                </div>

                <div className="form-group">
                    <label>Total Cost:</label>
                    <input 
                        type="text" 
                        name="totalCost" 
                        value={pet.totalCost} 
                        readOnly 
                        className="textCombo" 
                    />
                </div>

                <div className="form-group">
                    <label>Net Cost:</label>
                    <input 
                        type="text" 
                        name="netCost" 
                        value={pet.netCost} 
                        readOnly 
                        className="textCombo" 
                    />
                </div>

                <div className="form-group">
                    <button 
                        type="button" 
                        className="save-continue-btn" 
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button 
                        type="button" 
                        className="save-continue-btn" 
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <button 
                        type="button" 
                        className="save-continue-btn" 
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button 
                        type="button" 
                        className="save-continue-btn" 
                        onClick={resetForm}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
