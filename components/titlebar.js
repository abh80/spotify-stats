import { hostURL } from "../Constants";
export default function TitleBar({ title }) {
  return (
    <div
      id="window-controls"
      className="top-0 flex gap-2 flex-row hidden"
      style={{
        height: "35px",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <div
        className="electron-drag flex gap-2"
        style={{ height: "35px", width: "100%" }}
      >
        <img
          src={hostURL + "spotify/brand/assets/Spotify_Icon_RGB_Green.png"}
          width="27px"
          height="27px"
          style={{ marginTop: "5px", marginLeft: "5px", marginBottom: "5px" }}
        ></img>
        <div className="py-1" id = "window-controls-title" style={{ display: "flex" }}>
          Spotify Stats
        </div>
      </div>
      <div
        className="grid grid-flow-col auto-cols-max"
        style={{ marginLeft: "auto" }}
      >
        <div className="window-controls normal" id="min-btn">
          <img src="/min.png" />
        </div>
        <div className="window-controls normal">
          <img src="/max.png" />
        </div>
        <div className="window-controls red" id="close-btn">
          <img src="/close.png" />
        </div>
      </div>
    </div>
  );
}
