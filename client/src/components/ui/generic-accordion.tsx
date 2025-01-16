import React, { ReactNode } from 'react';

import { ChevronDown } from 'lucide-react';

import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';

export interface GenericAccordionProps {
  name: string;
  defaultOpen: boolean;
  children: ReactNode;
}

const GenericAccordion: React.FC<GenericAccordionProps> = ({ name, defaultOpen, children }) => {
  return (
    <div>
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <div className="flex flex-col overflow-hidden">
            <DisclosureButton className="flex w-full items-center justify-between py-4">
              <span className="text-primary text-[17px]">{name}</span>
              <ChevronDown
                width={16}
                height={16}
                className={`text-primary transition-transform duration-400 ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </DisclosureButton>

            <Transition unmount={false}>
              <DisclosurePanel unmount={false}>
                <div
                  className="transition-[max-height] duration-400"
                  ref={(ref) => {
                    if (!ref) return;

                    setTimeout(() => {
                      if (open) {
                        ref.style.maxHeight = `${ref.scrollHeight}px`;
                      } else {
                        ref.style.maxHeight = `0px`;
                      }
                    }, 0);
                  }}
                >
                  {children}
                </div>
              </DisclosurePanel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default GenericAccordion;
