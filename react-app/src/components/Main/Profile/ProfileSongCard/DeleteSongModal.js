import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal"
// import { getUserSongsThunk } from "../../../../store/songs";
import { useState } from "react";
import { deleteSongThunk } from "../../../../store/songs";

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
        <div>
            {deleting ?
                <>
                    Deleting song
                </>
                :
                <>
                    <h3>Confirm Song Delete</h3>
                    <p>Deleting a song cannot be undone</p>
                    <div>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>

            }
        </div>
    )
}
