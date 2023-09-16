"use client"
import { SaerchManufacturerProps } from '@/types'
import React from 'react'
import { Combobox , Transition} from '@headlessui/react'
import Image from 'next/image'
import {useState, Fragment} from 'react'
import { manufacturers } from '@/constants'

const SaerchManufacturer = (
   {
    manufacturer,
    setManufacturer
    
   }: SaerchManufacturerProps) => {
  const [query , setQuery] = useState<string>('')
  const filteredManufacturers = query === '' ? manufacturers : manufacturers.filter((manufacturer) => manufacturer.toLowerCase().replace(/\s/g, '').includes(query.toLowerCase().replace(/\s/g, '')))
  return (
    <div className='search-manufacturer'>
        <Combobox value={manufacturer} onChange={(manufacturer) => setManufacturer(manufacturer)} >
            <div className='relative w-full'>
                <Combobox.Button className="absolute top-[14px]">
                    <Image src="/car-logo.svg" width={20} height={20} alt="car-logo" className='ml-4' />

                </Combobox.Button>
                <Combobox.Input className='search-manufacturer__input' placeholder='Volkswagen' displayValue={(manufacturer: string) => manufacturer} onChange={(e) => setQuery(e.target.value)} />
                <Transition as ={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' afterLeave={() => setQuery('')}>
                    <Combobox.Options className='search-manufacturer__options ' style={{
                        position: 'inherit',
                        maxHeight: '200px',
                    }} >
                            {
                                filteredManufacturers.map((manufacturer) => (
                                        <Combobox.Option key={manufacturer} className={({active}) => `${active ? 'bg-primary-blue text-white' : 'text-gray-900'} relative search-manufacturer__option`} value={manufacturer} onClick={() => setManufacturer(manufacturer)}>
                                            {({selected, active}) => (
                                                <>
                                                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                                                        {manufacturer}
                                                    </span>
                                                    {selected ? (
                                                        <span className={`${active ? 'text-white' : 'text-primary-blue'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                                                            <Image src="/close.svg" width={20} height={20} alt="close" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}

                                            </Combobox.Option>
                           
                                ))
                            }

                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>

  )
}

export default SaerchManufacturer