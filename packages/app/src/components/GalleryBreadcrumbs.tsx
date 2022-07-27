import Link from "next/link";

export const GalleryBreadcrumbs = ({
  photoId,
  breadcrumb,
}: {
  photoId: number | undefined;
  breadcrumb: string;
}) => {
  return (
    <div className="h-16 flex items-center justify-between w-full">
      <div className="">
        <h4 className="lg:text-xl font-extralight leading-relaxed">
          <Link href="/the-hydra">
            <a className="font-extrabold">THE HYDRA</a>
          </Link>{" "}
          / <span className="uppercase">{breadcrumb}</span>
          {photoId && <span>#{photoId}</span>}
        </h4>
      </div>
    </div>
  );
};
