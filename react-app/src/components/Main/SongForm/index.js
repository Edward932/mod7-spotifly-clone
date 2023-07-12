import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { postSongThunk } from '../../../store/songs';
import './SongForm.css';


export default function SongForm() {
    const [songName, setSongName] = useState("");
    const [songData, setSongData] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("song_file", songData);
        formData.append("name", songName);
        formData.append("description", description);

        setLoading(true); // since loading is slow
        const res = await dispatch(postSongThunk(formData));

        if (res.error) {
            setLoading(false);
            setValidationErrors(res.error)
        } else {
            history.push("/main")
        }
    }

    return (
        <div>
            <h1>Upload a new song</h1>
            {loading && <h3>File uploading ...</h3>}
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <label>
                    Song Name
                    <input
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        maxLength={50}
                        minLength={2}
                    />
                </label>
                <p className="validation-error">{validationErrors.name}</p>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {setSongData(e.target.files[0])}}
                />
                 <p className="validation-error">{validationErrors.song_file}</p>
                <label>
                    Song Description
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={100}
                        minLength={5}
                    />
                </label>
                <p className="validation-error">{validationErrors.description}</p>
                <button type="submit">Upload Song</button>
            </form>
        </div>
    )
}
