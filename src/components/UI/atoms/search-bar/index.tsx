import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import data from "@/utils/data/search-results";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSearchQuery("");
        setIsModalOpen(false);
      }
    };
  
    document.addEventListener('click', handleDocumentClick);
  
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.replace(/\s+/g, '').length === 0) setIsModalOpen(false);
    setIsModalOpen(true);
    setSearchQuery(e.target.value);
  }

  return (
    <div className="flex py-1.5 items-center justify-between px-4  rounded-[8px] border-[rgba(255,255,255,0.1)] border-[0.5px] relative">
      <div className="flex gap-4 w-[90%] ">
        <Image src="/assets/icons/search-icon.svg" alt="search" width={20} height={20} />
        <input
          placeholder="Enter name or ID"
          className="w-[80%] bg-transparent outline-none text-sm"
          style={{ fontWeight: 'lighter', color: 'white' }}
          onChange={handleSearchChange} // Update search query state
        />
      </div>
      <div className="w-6 h-6 bg-[rgba(255,255,255,0.1)] rounded-sm flex justify-around">
        <label className="text-text-inactive">/</label>
      </div>

      {searchQuery.length > 0 && isModalOpen &&
      <div ref={modalRef} className="absolute w-full h-[max-content] top-12 left-0 border-[0.5px] rounded-[8px] border-[rgba(255,255,255,0.2)] grassy-gradient">
        {data.map((data, index: number) => (
          <div key={index} className="mt-2" style={{
            borderTop: index > 0 ? "0.5px solid rgba(255,255,255,0.5)" : ""
          }} >
            <div className="mt-4">
            <label className="text-white font-bold text-[0.8rem] ml-4 ">
              {data.category === "Holders" ? "Find Holders" : data.category}
            </label>
            </div>
            <div className="">
              {data.data
                .filter(
                  (info) =>
                    info.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter based on name
                    info.walletId.short.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter based on walletId.short
                    info.walletId.full.toLowerCase().includes(searchQuery.toLowerCase()) // Filter based on walletId.full
                )
                .map((info, index) => (
                  <div key={index} className="px-4 py-2 flex justify-between mt-4 hover:bg-[rgba(255,255,255,0.3)]">
                    <div className="flex gap-2">
                      <Image
                        src={`/assets/images/${info.avatar}`}
                        alt="avatar"
                        width={30}
                        height={30}
                      />
                      <div className="flex flex-col justify-betweeen">
                        <label className="text-[0.8rem] font-semibold text-white">{info.name}</label>
                        <label className="text-[0.8rem] font-light text-[rgba(255,255,255,0.6)]">
                          {info.walletId.short}
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      {(info.type === "Wallet" || info.type === "NFT" || info.type === "Collection") && 
                        <div className="border-[0.5px] rounded-[4px] px-2 py-1 border-[rgba(255,255,255,0.5)] flex items-center justify-between">
                          <label className="text-[0.7rem] text-[rgba(255,255,255,0.5)] font-semibold">{info.type}</label>
                        </div>
                      }
                      <FiChevronRight color="rgba(255,255,255,0.5)" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
}
    </div>
  );
}
