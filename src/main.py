"""Run a script to get an artist's most popular songs."""
import spotipy

BEATLES_ID = "3WrFJ7ztbogyGnTHbHJFl2"


def main():
    """Run a script to get an artist's most popular songs."""
    # authenticate client
    client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials()
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    album_ids = []
    current_result = sp.artist_albums(BEATLES_ID)
    while current_result:
        album_ids.append([album["id"] for album in current_result["items"]])
        current_result = sp.next(current_result)

    # get the track list for each album
    track_ids = []
    for id_group in album_ids:
        # get up to 20 albums at once
        albums = sp.albums(id_group)["albums"]
        for album in albums:
            for track in album["tracks"]["items"]:
                if BEATLES_ID in [artist["id"] for artist in track["artists"]]:
                    track_ids.append(track["id"])

    track_info = []
    track_id_groups = [track_ids[i : i + 50] for i in range(0, len(track_ids), 50)]
    for id_group in track_id_groups:
        tracks_resp = sp.tracks(id_group)
        track_info.extend(tracks_resp["tracks"])

    sorted_tracks = sorted(track_info, key=lambda k: k["popularity"], reverse=True)
    for index, track in zip(range(100), sorted_tracks):
        print(f"{index + 1}. {track['name']}: {track['popularity']}")


if __name__ == "__main__":
    main()
