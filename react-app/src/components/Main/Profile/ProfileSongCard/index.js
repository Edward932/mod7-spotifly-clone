import './ProfileSongCard.css';
import DeleteSongModal from './DeleteSongModal';
import OpenModalButton from '../../../OpenModalButton';
import EditSongModal from './EditSongModal';

export default function ProfileSongCard({ song, setNewDelete, newDelete }) {
    return (
        <div className="profile-song-card__outer-div">
            <p>Name: {song.name}</p>
            <p>description: {song.description}</p>
            <div>
                <OpenModalButton
                    modalComponent={<EditSongModal
                        song={song}
                        setNewDelete={setNewDelete}
                        newDelete={newDelete} />
                    }
                    buttonText={"Edit"}
                />
                <OpenModalButton
                    modalComponent={<DeleteSongModal
                        songId={song.id}
                        setNewDelete={setNewDelete}
                        newDelete={newDelete} />
                    }
                    buttonText={"Delete"}
                />
            </div>
        </div>
    )
}
