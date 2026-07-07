interface Props {
  name: string;
  coords: string;
}

export default function Highlight({ name, coords }: Props) {
  return (
    <div className="absolute top-0 -translate-y-[calc(100%+24px)] left-1/2 -translate-x-1/2 text-(--stroke) border border-(--stroke) rounded-md flex flex-col gap-2 p-3 saturate-75 brightness-200 pointer-events-none duration-200">
      <div className="ascii text-xs! font-normal!">{name}</div>
      <div className="ascii text-xs! font-normal! opacity-50">{coords}</div>
      <div className="absolute bottom-0 translate-y-full left-1/2 -translate-x-1/2 w-px h-4 bg-(--stroke)"></div>
    </div>
  );
}
