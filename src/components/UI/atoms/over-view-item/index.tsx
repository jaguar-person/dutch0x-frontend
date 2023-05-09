import React from 'react';
import { Overview } from '@/types/frontend/ui';
import { FiChevronRight } from 'react-icons/fi';

export default function OverviewItem({overview}: {overview: Overview}) {
    const {title, items} = overview;
    return (
        <div className="mt-2 border-[0.5px] w-full rounded-[8px] border-light px-4 py-2">
            {title && (
                <label className="font-[20px] text-white">{title}</label>
            )}
            <div className="w-full">
                {items.map((item, index: number) => (
                    <div className="my-2 w-full flex justify-between items-center" key={index}>
                        <div className="flex gap-2 items-center">
                            {item.subItems.map((subItem, subItemIndex) => (
                                <div key={subItemIndex} className="flex items-center">
                                    {subItemIndex > 0 && (
                                        <FiChevronRight
                                            color="rgba(255, 255, 255, 0.6)"
                                            className="transform hover:scale-110 transition-all duration-200"
                                        />
                                    )}
                                    <label className="text-[1rem] text-white opacity-50">{subItem}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 items-center">
                            {item.count && (
                                <label className="text-white text-[0.8rem] font-light">{item.count}</label>
                            )}
                            <FiChevronRight
                                color="rgba(255, 255, 255, 0.6)"
                                className="transform hover:scale-110 transition-all duration-200 cursor-pointer"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
