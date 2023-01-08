import Image from "next/image";

const Footer = () => {
  return (
    <div className="pt-16 pb-32 bg-slate-900 text-slate-100">
      <div className="text-center lg:hidden pt-8">
        <a href="https://therightchoyce.com">
          <Image
            src="/trc-logo.svg"
            width={500}
            height={100}
            alt="TheRightChoyce.eth"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
