import { SearchBar, CustomFilter, Hero, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

export default async function Home(SearchParams: any) {
  const allCars = await fetchCars({
    manufacturer: SearchParams.manufacturer || '',
    year: SearchParams.year || 2022,
    fuel: SearchParams.fuel || '',
    limit: SearchParams.limit || 10,
    model: SearchParams.model || '',
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars; 

  return (
    <main 
    className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
      <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
      <p>Explore the cars you might like</p>
      </div>
      <div className="home__filters">
      <SearchBar />
      

        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
              <CarCard car={car} />
              ))}
            </div>
            <ShowMore 
              pageNumber={(SearchParams.limit || 10) / 10}
              isNext={(SearchParams.limit || 10) > allCars.length}
            />
          </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              Oops, no results</h2>
          </div>
        )}

      </div>
    </main>
  );
}
