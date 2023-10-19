import Link from "next/link";
import { LuFacebook, LuInstagram, LuMail, LuTwitter } from 'react-icons/lu';

const Footer = () => {
  const socials = [
    {id: 8349, icon: <LuFacebook />},
    {id: 8949, icon: <LuInstagram />},
    {id: 89, icon: <LuTwitter />},
    {id: 9, icon: <LuMail />},
  ];

    return (
      <footer className="bg-slate-100 text-black px-14">
        <div className="flex mt-auto py-[72px] text-left">
          <div className="flex flex-col">
            <Link href="#" className="flex flex-1 gap-2 mb-4">
              <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.7761 10.6757L23.7599 10.6594C23.7586 10.6585 23.7575 10.6573 23.7569 10.6559L13.6067 0.505493L3.45664 10.6556C3.45548 10.6568 3.45482 10.6584 3.45364 10.6592L3.43689 10.6754C1.88481 12.2362 0.898966 14.271 0.636087 16.4565C0.373207 18.6419 0.848377 20.8525 1.98605 22.7369C3.12374 24.6212 4.85863 26.0713 6.91497 26.8563C8.9713 27.6414 11.2311 27.7166 13.335 27.0698C13.512 27.0157 13.7013 27.0157 13.8783 27.0698C15.9821 27.7164 18.2417 27.6411 20.2979 26.856C22.3541 26.0708 24.0888 24.6209 25.2264 22.7366C26.364 20.8523 26.8393 18.6419 26.5765 16.4566C26.3137 14.2713 25.328 12.2365 23.7761 10.6757ZM7.06587 17.369C7.01646 17.4184 6.97728 17.4771 6.95055 17.5416C6.92382 17.6061 6.91006 17.6753 6.91007 17.7452C6.92813 19.5366 7.43442 21.2892 8.37443 22.8143C8.39578 22.8489 8.40565 22.8894 8.40262 22.9299C8.3996 22.9704 8.38383 23.0089 8.35757 23.04C8.33131 23.0711 8.29591 23.093 8.25644 23.1027C8.21696 23.1123 8.17543 23.1093 8.13779 23.094C7.43111 22.7968 6.78913 22.3646 6.24774 21.8219C5.13827 20.7122 4.51454 19.2075 4.51353 17.6384C4.51252 16.0692 5.13432 14.5637 6.24238 13.4526L13.6067 6.089L20.9707 13.4526C22.0789 14.5635 22.7009 16.069 22.6999 17.6384C22.6989 19.2075 22.0751 20.7122 20.9655 21.8219C20.4241 22.3646 19.7822 22.7968 19.0757 23.094C19.0379 23.1093 18.9964 23.1123 18.9569 23.1027C18.9175 23.093 18.8821 23.0709 18.8557 23.04C18.8295 23.0089 18.8137 22.9704 18.8106 22.9298C18.8076 22.8893 18.8175 22.8488 18.8388 22.8142C19.7791 21.2892 20.2856 19.5366 20.304 17.7452C20.304 17.6753 20.2901 17.6061 20.2632 17.5415C20.2363 17.4769 20.197 17.4183 20.1475 17.3689L16.6643 13.6743C16.6295 13.6453 16.5859 13.6295 16.5407 13.6295C16.4956 13.6295 16.4518 13.6453 16.4172 13.6743C16.3825 13.7031 16.3592 13.7434 16.351 13.7878C16.3429 13.8322 16.3506 13.878 16.3729 13.9173C17.7257 16.3654 16.5624 19.8817 14.6225 21.8219L14.6123 21.8322C14.3445 22.097 13.983 22.2455 13.6064 22.2454C13.2298 22.2453 12.8684 22.0965 12.6009 21.8315L12.5914 21.8219C10.6508 19.8817 9.48808 16.3658 10.8411 13.9178C10.8633 13.8785 10.8711 13.8328 10.863 13.7883C10.8549 13.7439 10.8315 13.7037 10.7968 13.6748C10.7622 13.6459 10.7185 13.63 10.6733 13.63C10.6282 13.63 10.5844 13.6459 10.5498 13.6748L7.06587 17.369Z" fill="#121212"/>
              </svg>
              <span className="text-black font-black text-2xl">Home Of Plants</span>
            </Link>
            <p className="text-[16px] leading-[26px] text-[#605F5F] w-[310px] mb-6">Experience the future of e-commerce design with SHOPR</p>
            <ul className="flex gap-1.5">
              {socials.map((social) => (
                <li key={social.id} className="p-[9px] bg-white rounded-full">
                  <Link href="">{social.icon}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex ml-auto gap-x-[120px] gap-y-6">
            <div className="flex flex-col min-w-[134px] gap-y-4">
              <h3 className="text-[14px] leading-[24px] font-medium text-[#121212]">Shop</h3>
              <ul className="flex flex-col gap-[12px]">
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">My account</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Login</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Wishlist</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Cart</Link></li>
              </ul>
            </div>
            <div className="flex flex-col min-w-[134px] gap-y-4">
              <h3 className="text-[14px] leading-[24px] font-medium text-[#121212]">Information</h3>
              <ul className="flex flex-col gap-[12px]">
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Shipping Policy</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Returns & Refunds</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Cookies Policy</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Frequently asked</Link></li>
              </ul>
            </div>
            <div className="flex flex-col min-w-[134px] gap-y-4">
              <h3 className="text-[14px] leading-[24px] font-medium text-[#121212]">Company</h3>
              <ul className="flex flex-col gap-[12px]">
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">About us</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Privacy Policy</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Terms & Conditions</Link></li>
                <li><Link className="text-[14px] leading-[22px] text-[#3E3E59]" href="">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 pb-8">
          <p>© 2023 SHOPR</p>
        </div>
      </footer>
    );
};
  
export default Footer;