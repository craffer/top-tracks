"""Run a script to get an artist's most popular songs."""
import spotipy

BEATLES_ID = "3WrFJ7ztbogyGnTHbHJFl2"


def get_artist_albums_ids(sp, artist_id):
    album_ids = []
    current_result = sp.artist_albums(artist_id, album_type="album")
    while current_result:
        album_ids.append([album["id"] for album in current_result["items"]])
        current_result = sp.next(current_result)
    current_result = sp.artist_albums(artist_id, album_type="single")
    while current_result:
        album_ids.append([album["id"] for album in current_result["items"]])
        current_result = sp.next(current_result)
    return album_ids


def main():
    """Run a script to get an artist's most popular songs."""
    # authenticate client
    client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials()
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    album_ids = get_artist_albums_ids(sp, BEATLES_ID)

    # get the track list for each album
    track_ids = []
    for id_group in album_ids:
        # get up to 20 albums at once
        albums = sp.albums(id_group)["albums"]
        for album in albums:
            for track in album["tracks"]["items"]:
                if BEATLES_ID in [artist["id"] for artist in track["artists"]]:
                    track_ids.append(track["id"])

    track_popularity = {}
    track_id_groups = [track_ids[i : i + 50] for i in range(0, len(track_ids), 50)]
    for id_group in track_id_groups:
        tracks = sp.tracks(id_group)
        for track in tracks["tracks"]:
            track_popularity[track["name"]] = track["popularity"]

    sorted_tracks = {
        k: v
        for k, v in sorted(
            track_popularity.items(), key=lambda item: item[1], reverse=True
        )
    }
    for track, popularity in sorted_tracks.items():
        print(track, popularity)


if __name__ == "__main__":
    main()
