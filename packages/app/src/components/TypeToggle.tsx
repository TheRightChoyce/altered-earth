export const TypeToggle = ({
  type,
  setType,
}: {
  type: string | undefined;
  setType: (typeName: string) => void;
}) => {
  return (
    <div className="inline-flex my-[2vh] w-full bg-slate-900">
      <a
        href="#original"
        aria-current="page"
        className={`
              ${
                type == "original"
                  ? "text-slate-100 bg-slate-700"
                  : "text-slate-600 hover:text-slate-400"
              } px-4 py-2 w-1/2 text-lg text-center transition-all duration-500
            `}
        onClick={() => setType("original")}
      >
        1 of 1 Original
      </a>
      <a
        href="#edition"
        className={`
              ${
                type == "edition"
                  ? "text-slate-100 bg-slate-700"
                  : "text-slate-600 hover:text-slate-400"
              } px-4 py-2 w-1/2 text-lg text-center transition-all duration-500
            `}
        onClick={() => setType("edition")}
      >
        On-chain edition
      </a>
    </div>
  );
};
