import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Prop() {
    const r = localStorage.getItem('phone');
    const navigation = useNavigate();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [rooms, setRooms] = useState('');
    const [minduration, setminDuration] = useState('');
    const [maxduration, setmaxDuration] = useState('');
    const [rent, setrent] = useState('');
    const [amenities, setamenities] = useState('');
    const [file, setFile] = useState('');
    const [file1, setFile1] = useState('');

    const openBox = () => {
        setOpen(true);
    };

    const closeBox = () => {
        setOpen(false);
    };

    const addUser = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('image1', file);
        formData.append('image2', file1);
        formData.append('num', r);
        formData.append('name', name);
        formData.append('rooms', rooms);
        formData.append('minduration', minduration);
        formData.append('maxduration', maxduration);
        formData.append('rent', rent);
        formData.append('amenities', amenities);


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const res = await Axios.post('http://localhost:8080/register', formData, config);
            console.log(res);
            if(res.data.status===201){
            navigation('/Property');
            }
            else{
                console.log('Error',res.data.error)
            }
        } catch (error) {
            console.error('Error uploading property:', error.message, error.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-5">
                <h1 className="text-center mb-5">Add Property</h1>
                <button className="btn btn-primary mb-3" onClick={openBox}>
                    Add Details
                </button>

                {open && (
                    <div className="customPopup">
                        <div className="popupContent">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="residencyName" className="form-label">
                                        Residency Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Residency Name"
                                        name="name"
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="rooms" className="form-label">
                                        Number of Rooms
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Number of Rooms"
                                        name="rooms"
                                        onChange={(event) => setRooms(event.target.value)}
                                        required
                                    />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="duration" className="form-label">
                                        Min Duration (in days)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter min Duration"
                                        name="minduration"
                                        onChange={(event) => setminDuration(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="duration" className="form-label">
                                        Max Duration (in days)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter max Duration"
                                        name="maxduration"
                                        onChange={(event) => setmaxDuration(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rooms" className="form-label">
                                        Per day rent
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Set rent"
                                        name="rent"
                                        onChange={(event) => setrent(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="residencyName" className="form-label">
                                        Amenities
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Residency Name"
                                        name="amenities"
                                        onChange={(event) => setamenities(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo1" className="form-label">
                                        Choose Image 1
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="photo1"
                                        name="photo1"
                                        onChange={(event) => setFile(event.target.files[0])}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="photo2" className="form-label">
                                        Choose Image 2
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="photo2"
                                        name="photo2"
                                        onChange={(event) => setFile1(event.target.files[0])}
                                        required
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-success" type="button" onClick={addUser}>
                                        Upload
                                    </button>
                                    <button className="btn btn-secondary" type="button" onClick={closeBox}>
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prop;
