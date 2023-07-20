import './ProfileSongCard.css';
import DeleteSongModal from './DeleteSongModal';
import OpenModalButton from '../../../OpenModalButton';
import EditSongModal from './EditSongModal';

export default function ProfileSongCard({ song, setNewDelete, newDelete }) {
    return (
        <div className="profile-song-card__outer-div">
            <div className='profile-song-card__title-div'>
                <p className='profile-song-card__title'>{song.name}</p>
            </div>
            <p className='profile-song-card__description'>{song.description}</p>
            <div className='profile-song-card__buttons'>
                <OpenModalButton
                    modalComponent={<EditSongModal
                        song={song}
                        setNewDelete={setNewDelete}
                        newDelete={newDelete} />
                    }
                    buttonText={<i className="profile-song-card__edit fa-regular fa-pen-to-square"></i>}
                />
                <OpenModalButton
                    modalComponent={<DeleteSongModal
                        songId={song.id}
                        setNewDelete={setNewDelete}
                        newDelete={newDelete} />
                    }
                    buttonText={<i className="profile-song-card__delete fa-solid fa-trash"></i>}
                />
            </div>
        </div>
    )
}
