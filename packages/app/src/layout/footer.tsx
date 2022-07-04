import Image from "next/image";

const Footer = () => {
  return (
    <div className="pt-8 lg:pt-16 pb-32 bg-gray-900 text-gray-100">
      <div className="text-center">
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
