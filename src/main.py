"""Run a script to get an artist's most popular songs."""
import spotipy

BON_IVER_ID = "4LEiUm1SRbFMgfqnQTwUbQ"


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

    album_ids = get_artist_albums_ids(sp, BON_IVER_ID)

    # get the track list for each album
    track_ids = []
    for id_group in album_ids:
        # get up to 20 albums at once
        albums = sp.albums(id_group)["albums"]
        for album in albums:
            for track in album["tracks"]["items"]:
                if BON_IVER_ID in [artist["id"] for artist in track["artists"]]:
                    track_ids.append(track["id"])


if __name__ == "__main__":
    main()
