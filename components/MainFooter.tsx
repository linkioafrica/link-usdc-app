import Image from "next/image";
import Link from "next/link";

export const MainFooter = () => {
  return (
    <div className="text-white bg-[rgb(19,19,19)] px-10 py-20 text-sm">
      <section className="space-y-14 w-full md:w-[64rem] mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:items-center justify-start md:justify-between">
          <div className="flex md:items-center flex-col md:flex-row gap-5 justify-start md:justify-between">
            {links.map((link, index) => (
              <Link
                target="_blank"
                href={link.link}
                key={index}
                className="font-normal hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <Link target="_blank" href="https://x.com/Link_IO">
              <Image
                src="/assets/png/twitter.png"
                alt="X"
                width={22}
                height={22}
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/link-xyz/posts/?feedView=all"
            >
              <Image
                src="/assets/png/linkedin.png"
                alt="X"
                width={22}
                height={22}
              />
            </Link>
            <Link target="_blank" href="https://www.instagram.com/link.io_/">
              <Image
                src="/assets/png/instagram.png"
                alt="X"
                width={22}
                height={22}
              />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="col-span-1">
            <Image
              src="/link-white.png"
              className="object-cover"
              alt="logo"
              width={220}
              height={220}
            />
          </div>

          <div className="col-span-4 space-y-5">
            <p className="font-normal">
              LINK is a Financial Technology company and not a bank.
            </p>
            <p className="font-normal">
              LINK offers its products and services in partnership with licensed
              transmitters in their respective jurisdictions.
            </p>
            <p className="font-normal">
              LINK is a regulated Money Service Business with FINTRAC (
              <span className="text-primary">M23788221</span>)
            </p>
            <p className="text-[#AEB0B0] font-normal">
              © 2024 LINK Technology. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const links = [
  {
    name: "About",
    link: "http://linkio.world/about",
  },
  {
    name: "Developer Docs",
    link: "https://docs.linkio.world/docs/getting-started",
  },
  {
    name: "Terms & Conditions",
    link: "https://playful-radish-285.notion.site/Terms-Conditions-f8cb83774bc14cb29423d29d1ab08a50",
  },
  {
    name: "Privacy Policy",
    link: "https://playful-radish-285.notion.site/Privacy-Policy-0d639b29edc840c4aa48eab00c9231fd",
  },
  {
    name: "Contact Support",
    link: "mailto:support@linkio.africa",
  },
];
