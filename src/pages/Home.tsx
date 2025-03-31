import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";
import Skeleton from "../components/Skeleton";
import axios from "axios";
// import { Skeleton } from "@mui/material";
import { KeyboardArrowDownRounded, SearchRounded } from "@mui/icons-material";

interface CountryInfo {
  area: number;
  name: { common: string };
  population: number;
  region: string;
  capital: string[];
  flags: { svg: string; alt: string };
}

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [region, setRegion] = useState<string>("all");

  const countriesToShow = searchVal
    ? countries.map((countryInfo, index) =>
        isLoading ? (
          <Skeleton key={index} />
        ) : (
          <CountryCard key={index} country={countryInfo} />
        )
      )
    : countries
        .filter((countryInfo: CountryInfo) =>
          countryInfo.name.common
            .toLowerCase()
            .includes(searchVal.toLowerCase())
        )
        .map((countryInfo, index) =>
          isLoading ? (
            <Skeleton key={index} />
          ) : (
            <CountryCard key={index} country={countryInfo} />
          )
        );

  useEffect(() => {
    let url: string;

    if (searchVal) {
      url = `https://restcountries.com/v3.1/name/${searchVal}`;
    } else if (region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}`;
    } else {
      url = "https://restcountries.com/v3.1/all";
    }
    // const url: string = "https://restcountries.com/v3.1/all";
    const getCountries = async () => {
      try {
        if (!isLoading) setIsLoading(true);

        await axios.get(url).then((response) => {
          setCountries(response.data);
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCountries();
  }, [searchVal, region]);

  return (
    <main className='min-h-[90vh] p-4 dark:bg-blue-900 dark:text-white'>
      <div className='max-w-[124rem] mx-auto pt-8 grid gap-8'>
        <section className='w-full flex flex-wrap justify-between gap-2'>
          <div className='relative w-full md:w-[45%]'>
            <input
              type='text'
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder='Search for a country...'
              className='dark:bg-blue-700 w-full p-3 pl-10 rounded-lg shadow-lg'
            />
            <SearchRounded
              fontSize='large'
              className='absolute left-3 top-1/2 -translate-y-1/2'
            />
          </div>

          <div className='relative'>
            <select
              name='region'
              id='region'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className='dark:bg-blue-700 p-3 pr-5 rounded-lg shadow-lg'
            >
              <option value='all'>Filter by Region</option>
              <option value='africa'>Africa</option>
              <option value='america'>America</option>
              <option value='asia'>Asia</option>
              <option value='europe'>Europe</option>
              <option value='oceania'>Oceania</option>
            </select>
            <KeyboardArrowDownRounded
              sx={{ fontSize: 28 }}
              className='absolute top-1/2 right-[0.2rem] -translate-y-1/2 dark:bg-blue-700 w-8 h-8 appearance-none pointer-events-none'
            />
          </div>
        </section>

        <section className='w-full grid justify-start gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {countriesToShow}
        </section>
      </div>
    </main>
  );
}

export default Home;
