import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowBackOutlined } from "@mui/icons-material";
import BorderCountry from "../components/BorderCountry";
import Skeleton from "../components/Skeleton";
// import { Skeleton } from "@mui/material";

interface CountryInfoProps {
  area: number;
  name: { common: string; nativeName: object };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  flags: { png: string; svg: string; alt: string };
  borders: string[];
  languages: object;
}

function Country() {
  const { countryName } = useParams();
  // const [currCountryName, setCurrCountryName] = useState<string>(countryName)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countryDetails, setCountryDetails] = useState<CountryInfoProps | null>(
    null
  );

  const imgSrc = countryDetails?.flags.png.replace("w320", "w640");
  const countryParam: string | undefined = countryName?.split("-")?.join(" ");
  const languages: string =
    Object.values(countryDetails?.languages ?? {})?.join(", ") || "No data";
  const nativeNames: string =
    Object.values(countryDetails?.name.nativeName ?? {})
      .map((name) => name.common)
      ?.join(", ") || "No data";

  useEffect(() => {
    const getCountry = async () => {
      try {
        if (!isLoading) setIsLoading(true);
        // setCurrCountryName(countryName);
        const url = `https://restcountries.com/v3.1/name/${countryParam}?fullText=true`;

        await axios.get(url).then((response) => {
          setCountryDetails(response.data[0]);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCountry();
  }, [countryName]);

  return (
    <main className='min-h-[90vh] p-4 dark:bg-blue-900 dark:text-white'>
      <div className='max-w-[124rem] mx-auto mt-6 grid gap-5'>
        <Link
          to='/'
          className='p-2 px-4 dark:bg-blue-700 w-fit flex gap-1 items-center rounded-lg shadow-lg'
        >
          <ArrowBackOutlined fontSize='large' />
          Go Home
        </Link>

        <section className='w-full mt-6 grid gap-8 lg:grid-cols-2 items-center'>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div>
              <img
                src={imgSrc}
                alt=''
                className='w-full shadow-lg rounded-lg object-cover md:h-[40rem]'
              />
            </div>
          )}

          {isLoading ? (
            <Skeleton />
          ) : (
            <div className='grid gap-5 md:grid-cols-2 md:gap-6 md:items-start'>
              <h1 className='font-bold text-2xl md:col-span-full'>
                {countryDetails?.name.common}
              </h1>

              <div className='grid gap-1'>
                <p className='text-lg'>
                  <span className='font-semibold'>Native Name(s):</span>{" "}
                  {nativeNames}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Population:</span>{" "}
                  {countryDetails?.population.toLocaleString() || "No data"}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Region:</span>{" "}
                  {countryDetails?.region || "No data"}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Sub Region:</span>{" "}
                  {countryDetails?.subregion || "No data"}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Capital:</span>{" "}
                  {countryDetails?.capital?.join(", ") || "No data"}
                </p>
              </div>

              <div className='grid gap-1'>
                <p className='text-lg'>
                  <span className='font-semibold'>Top Level Domain:</span>{" "}
                  {countryDetails?.tld[0]}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Currencies:</span> Euro
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Languages:</span> {languages}
                </p>
              </div>

              <div className='flex flex-wrap items-center gap-2 md:col-span-full'>
                <p className='mr-2 w-full md:w-fit'>Border Countries:</p>

                {countryDetails?.borders?.map((country, index) => (
                  <BorderCountry key={index} countryCode={country} />
                )) || "No bordering Countries"}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Country;
