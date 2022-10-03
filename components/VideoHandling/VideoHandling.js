import React, { Component } from "react";
import { Player, ControlBar } from "video-react";
import { Button, Container } from "@mui/material";
import { SmartButtonSharp } from "@mui/icons-material";

const sources = {
  sintelTrailer: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  bunnyTrailer: "https://download.blender.org/peach/trailer/trailer_400p.ogg",
  bunnyMovie: "http://media.w3.org/2010/05/bunny/movie.mp4",
  test: "http://media.w3.org/2010/05/video/movie_300.webm",
};

export default class VideoHandling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: sources.bunnyMovie,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);

    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changePlaybackRate = this.changePlaybackRate.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    this.setState({ player: state });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRate(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name],
      });
      this.player.load();
    };
  }

  render() {
    return (
      <div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            href="/dashboard"
            style={{ paddingLeft: 50, paddingRight: 50, margin: 20 }}
          >
            Back
          </Button>
        </div>
        <Container
          maxWidth="lg"
          style={{ paddingBottom: 500, marginTop: -650 }}
        >
          <Player
            ref={(player) => {
              this.player = player;
            }}
            autoPlay
          >
            <source src={this.state.source} />
            <ControlBar autoHide={false} />
          </Player>

          <div style={{ padding: 10 }}>
            <Button
              onClick={this.play}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Play
            </Button>
            <Button
              onClick={this.pause}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Pause
            </Button>
            <Button
              onClick={this.load}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Load
            </Button>
          </div>

          <div style={{ padding: 10 }}>
            <Button
              onClick={this.changePlaybackRate(1)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              PlaybackRate++
            </Button>
            <Button
              onClick={this.changePlaybackRate(-1)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              PlaybackRate--
            </Button>
            <Button
              onClick={this.changePlaybackRate(0.1)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              PlaybackRate+=0.1
            </Button>
            <Button
              onClick={this.changePlaybackRate(-0.1)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              PlaybackRate-=0.1
            </Button>
          </div>

          <div style={{ padding: 10 }}>
            <Button
              onClick={this.changeVolume(0.1)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Volume+=0.1
            </Button>
            <Button
              onClick={this.changeVolume(-0.1)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Volume-=0.1
            </Button>
            <Button
              onClick={this.setMuted(true)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Muted=true
            </Button>
            <Button
              onClick={this.setMuted(false)}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Muted=false
            </Button>
          </div>

          <div style={{ padding: 10 }}>
            <Button
              onClick={this.changeSource("sintelTrailer")}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Sintel teaser
            </Button>
            <Button
              onClick={this.changeSource("bunnyTrailer")}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Bunny trailer
            </Button>
            <Button
              onClick={this.changeSource("bunnyMovie")}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Bunny movie
            </Button>
            <Button
              onClick={this.changeSource("test")}
              variant="contained"
              color="primary"
              style={{ marginRight: 10, backgroundColor: "#24a0ed" }}
            >
              Test movie
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
