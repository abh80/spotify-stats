import * as Util from "../Util"
export default function TrackItem({ index, name, artist, cover, albumname }) {
  return (
    <div
      class="grid grid-cols-6 gap-10"
      style={{
        height: "100px",
        minHeight: "100px",
        width: "100%",
        minWidth: "800px",
      }}
    >
      <div className = "py-10" style = {{fontWeight : "bold"}}>{index}</div>
      <img height="100px" width="100px" src={cover} loading = "lazy"></img>
      <div className = "py-5">
        <p  style={{fontWeight : "bold",textAlign : "left"}}>{Util.truncate(name)}</p>
        <p>{Util.truncate(artist)}</p>
      </div>
      <div className = "py-5">{Util.truncate(albumname)}</div>
    </div>
  );
}
