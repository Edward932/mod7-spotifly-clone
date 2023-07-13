import './ProfileSongCard.css';
import DeleteSongModal from './DeleteSongModal';
import OpenModalButton from '../../../OpenModalButton';

export default function ProfileSongCard({ song, setNewDelete, newDelete }) {
    const handleEdit = () => {
        alert("Edit not ready yet")
    }

    return (
        <div className="profile-song-card__outer-div">
            <p>Name: {song.name}</p>
            <p>description: {song.description}</p>
            <div>
                <button onClick={handleEdit}>Edit</button>
                <OpenModalButton
                    modalComponent={<DeleteSongModal songId={song.id} setNewDelete={setNewDelete} newDelete={newDelete} />}
                    buttonText={"Delete"}
                />
            </div>
        </div>
    )
}
