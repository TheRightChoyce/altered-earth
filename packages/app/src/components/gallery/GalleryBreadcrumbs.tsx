import Link from "next/link";

export const GalleryBreadcrumbs = ({
  breadcrumb,
  photoId,
}: {
  breadcrumb: string | undefined;
  photoId: number | undefined;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="">
        <h4 className="lg:text-xl font-extralight leading-relaxed">
          <Link href="/">
            <a className="font-extrabold">AE</a>
          </Link>
          <span> / </span>
          <Link href="/the-hydra">
            <a className="font-extrabold">THE HYDRA</a>
          </Link>
          {breadcrumb !== undefined && (
            <span className="uppercase"> / {breadcrumb}</span>
          )}

          {photoId !== undefined && <span> / #{photoId}</span>}
        </h4>
      </div>
    </div>
  );
};
