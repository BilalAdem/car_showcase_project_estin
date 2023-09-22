"use client"
import { CustomFilterProps } from "@/types"
import Image from "next/image"
import { useState , Fragment } from "react"
import { useRouter } from "next/navigation"
import { Listbox, Transition } from '@headlessui/react'
import { UpdateParams } from "@/utils"


const CustomFiler = ({title , options}: CustomFilterProps
    ) => {
  const [selected , setSelected] = useState(options[0])
  const router = useRouter()

  const handleUpdateParams = (e: {title: string , value: string}) => {
    const newPathName = UpdateParams(title, e.value.toLocaleLowerCase())
    router.push(newPathName , {scroll: false})

}

   
  return (
    <div className="w-fit">
      <Listbox value={selected} onChange={(e) =>{setSelected(e); handleUpdateParams(e)}}>
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image src="/chevron-up-down.svg" width={20} height={20} alt="chevron-down" className="object-contain ml-4"/>
          </Listbox.Button>
        </div>
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <Listbox.Options className="custom-filter__options" style={{width: 'fit-content' , zIndex: 10 , maxHeight: 'fit-content'}}>
            {options.map((option) => (
              <Listbox.Option value={option} key={option.title} className={({active}) => `cursor-default relative select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}>
                {({ selected }) => (
                  <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                    {option.title}
                  </span>
                )}

              </Listbox.Option>
            ))}

          </Listbox.Options>
          </Transition>
          
      </Listbox>
    </div>
  )
}

export default CustomFiler