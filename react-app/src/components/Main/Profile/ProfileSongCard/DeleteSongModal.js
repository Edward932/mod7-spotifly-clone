import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal"
import { useState } from "react";
import { deleteSongThunk } from "../../../../store/songs";
import "./DeleteSongModal.css"

export default function DeleteSongModal ({ songId, setNewDelete, newDelete}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);

    const handleCancel = () => {
        closeModal();
    }

    const handleDelete = async () => {
        setDeleting(true);
        const res = await dispatch(deleteSongThunk(songId));
        setNewDelete(!newDelete)
        console.log('RES IN HANDLE DELTE', res)
        closeModal();
    }


    return (
        <div className="delete-song-modal__outer">
            {deleting ?
                <>
                    Deleting song
                </>
                :
                <>
                    <p className="delete-song-modal__title">Confirm Song Delete</p>
                    <p className="delete-song-model__warning">Deleting a song cannot be undone</p>
                    <div className="delete-song-modal__button-div">
                        <button className="delete-song-modal__close" onClick={handleCancel}>Cancel</button>
                        <button className="delete-song-modal__delete" onClick={handleDelete}>Delete</button>
                    </div>
                </>

            }
        </div>
    )
}
