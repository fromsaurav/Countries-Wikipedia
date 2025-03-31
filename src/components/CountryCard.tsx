import { Link } from "react-router-dom";

interface CountryInfo {
  area: number;
  name: { common: string };
  population: number;
  region: string;
  capital: string[];
  flags: { svg: string; alt: string };
}

function CountryCard({ country }: { country: CountryInfo }) {
  const allCapitals: string = country.capital?.join(", ");
  const countryEndpoint: string = country.name.common
    .toLowerCase()
    .split(" ")
    .join("-");

  return (
    <div className='min-h-[30rem] dark:bg-blue-700 self-center shadow-xl rounded-xl overflow-hidden'>
      <Link to={`/${countryEndpoint}`}>
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          className='w-full min-h-[16rem] aspect-video object-cover'
        />
      </Link>

      <div className='p-4 pb-10 flex flex-col gap-1'>
        <Link to={`/${countryEndpoint}`} className='hover:underline'>
          <h3 className='py-2 font-extrabold text-lg'>{country.name.common}</h3>
        </Link>

        <p className='text-base'>
          <span className='font-semibold'>Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
        <p className='text-base'>
          <span className='font-semibold'>Region:</span> {country.region}
        </p>
        <p className='text-base'>
          <span className='font-semibold'>Capital:</span> {allCapitals}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
