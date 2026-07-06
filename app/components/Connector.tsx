type Props = {
  type: "line" | "dot";
};

export default function Connector({ type }: Props) {
  return (
    <div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-4 -translate-x-full w-8 h-px bg-(--stroke)/20 rounded-4xl pointer-events-none duration-200"
        style={{
          width: type === "line" ? "32px" : "16px",
        }}
      >
        {type === "dot" && (
          <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-px h-4 bg-(--stroke)/20 rounded-full pointer-events-none duration-200"></div>
        )}
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-4 translate-x-full w-8 h-px bg-(--stroke)/20 rounded-4xl pointer-events-none duration-200"
        style={{
          width: type === "line" ? "32px" : "16px",
        }}
      >
        {type === "dot" && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-px h-4 bg-(--stroke)/20 rounded-full pointer-events-none duration-200"></div>
        )}
      </div>
    </div>
  );
}
