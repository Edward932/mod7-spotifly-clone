import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../../../context/Modal"
import { updateSongThunk } from '../../../../store/songs';
import './EditSongModal.css';


export default function EditSongModal({ song, setNewDelete, newDelete }) {
    const [songName, setSongName] = useState(song.name);
    const [songData, setSongData] = useState(null);
    const [description, setDescription] = useState(song.description);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("song_file", songData);
        formData.append("name", songName);
        formData.append("description", description);

        setLoading(true);
        const res = await dispatch(updateSongThunk(formData, song.id)); //update songs

        if (res.error) {
            setLoading(false);
            setValidationErrors(res.error)
        } else {
            setNewDelete(!newDelete)
            closeModal();
        }
    }

    const handleCancel = () => {
        closeModal();
    }

    return (
        <div className='edit-song-modal__outer'>
            <h1>Update song</h1>
            {loading && <h3>Updating song ...</h3>}
            <form
                className='edit-song-form__form'
                onSubmit={handleEdit}
                encType='multipart/form-data'
            >
                <label>
                Song Name
                    <input
                        className='edit-song-form__input'
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        maxLength={50}
                        minLength={2}
                    />
                    {songName.length >= 50 && <p>Song name max length reached</p>}
                </label>
                <p className="validation-error">{validationErrors.name}</p>
                <label>
                    New audio file (optional)
                    <input
                        className='edit-song-form__file'
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {setSongData(e.target.files[0])}}
                    />
                </label>
                 <p className="validation-error">{validationErrors.song_file}</p>
                <label>
                    Song Description
                    <input
                        className='edit-song-form__input'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={100}
                        minLength={5}
                    />
                    {description.length >= 100 && <p>Song description max length reached</p>}
                </label>
                <p className="validation-error">{validationErrors.description}</p>
                <div className='edit-song-form__buttons'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Update Song</button>
                </div>
            </form>
        </div>
    )
}
