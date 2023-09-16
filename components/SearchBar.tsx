"use client"
import {useState} from 'react'
import { SaerchManufacturer } from '.'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const SearchButton = ({otherClasses} :{
    otherClasses: string
} ) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src='/magnifying-glass.svg' width={40} height={40} alt='search' className='object-contain'/>
  </button>
)


const SearchBar = () => {
    const [model , setModel] = useState<string>('')
    const router = useRouter()
    const [manufacturer , setmManufacturer] = useState<string>('')
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(manufacturer === '' || model === '') return alert('Please fill all the fields')
        updateSearchParams(model.toLocaleLowerCase() , manufacturer.toLocaleLowerCase())


    }

    const updateSearchParams = (model: string , manufacturer: string ) => {
        const searchParms = new URLSearchParams(window.location.search)
        if(model){
            searchParms.set('model' , model)
        } else {
            searchParms.delete('model')
        }
        if(manufacturer){
            searchParms.set('manufacturer' , manufacturer)
        } else {
            searchParms.delete('manufacturer')
        }
        const newPathName = `${window.location.pathname}?${searchParms.toString()}`
        router.push(newPathName)

    }


    

  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='searchbar__item'>
            <SaerchManufacturer
                manufacturer={manufacturer}
                setManufacturer={setmManufacturer}
             />
             <SearchButton otherClasses="sm:hidden" />
        </div>
        <div className='searchbar__item'>
            <Image src="/model-icon.png" width={25} height={25} alt="model" className="absolute z-10 ml-4"/>
            <input type="text" placeholder="Tiguan" className="searchbar__input" name='model' value={model} onChange={(e) => setModel(e.target.value)} />
            <SearchButton otherClasses="sm:hidden" />

        </div>
        <SearchButton otherClasses="max-sm:hidden" />


    </form>
  )
}

export default SearchBar