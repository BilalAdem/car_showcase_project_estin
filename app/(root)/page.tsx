import { CarCard, CustomFiler, Hero, SearchBar, ShowMore } from '@/components'
import { fetchCars } from '../../utils'
import { HomeProps } from '@/types';
import { fuels, yearsOfProduction } from '@/constants';


export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    model: searchParams.model || '',
    fuel: searchParams.fuel || '',
    year: searchParams.year || 2022,
    limit: searchParams.limit || 10,

  });
  const isDataEmpty = allCars.length === 0;
  return (
      <main className='overflow-hidden'>
        <Hero />
        <div className='mt-12 padding-x padding-y max-width' id='discover'>
          <div className='home__text-conatiner'>
            <h1 className='text-4xl font-extrabold'>
              Car Catalogue
            </h1>
            <p className='text-lg mt-4'>
              Explore our wide range of cars from different brands and models.
            </p>
          </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
          <CustomFiler title="fuel" options = {fuels} />
          <CustomFiler title="year" options = {yearsOfProduction} />
          </div>
        </div>
        <div>
          {!isDataEmpty ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car: any) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
              <div>
                <ShowMore 
                  pageNumber= {(searchParams.limit || 10) / 10}
                  isNext = {(searchParams.limit || 10) > allCars.length}
                />
              </div>
            </section>
          ) : (
            <div>
              <h2 className='text-3xl font-bold text-center'>Oops, no data found</h2>
              <p className='text-center mt-4'>
                {allCars?.message}
              </p>
            </div>
          )
            }
        </div>
        </div>
      </main>
  )
}
