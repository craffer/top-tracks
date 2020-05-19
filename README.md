# Popular Tracks

A web app to show the top 100 most popular tracks for a Spotify artist.

## Installation

Clone this repository and create a Python virtual environment, then run `make init` to install our dependencies.

```bash
git clone git@github.com:craffer/top-tracks.git
cd top-tracks
python3 -m venv env
make init
```

## Usage

To run the program locally, compile a React build using `webpack`, then use the bash script provided and access the site at [localhost:8000](localhost:8000).

```bash
npx webpack
./bin/run
```

## Deployment

This project is deployed to a DigitalOcean droplet, served using uWSGI and Nginx. It can be accessed at [https://conorrafferty.com/tracks](https://conorrafferty.com/tracks).

## License

This project is licensed under the MIT license – see the [LICENSE](LICENSE) file for more details.

## Acknowledgements

This project uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) and the Python wrapper [Spotipy](https://github.com/plamere/spotipy) to interact with Spotify.
