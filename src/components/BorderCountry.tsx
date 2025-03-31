import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BorderCountry({ countryCode }: { countryCode: string }) {
  const [fullName, setFullName] = useState<string>(countryCode);

  const nameParam: string = fullName.split(" ").join("-").toLowerCase();

  useEffect(() => {
    try {
      const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;

      axios.get(url).then((response) => {
        setFullName(response.data[0].name.common);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <Link
      to={`/${nameParam}`}
      className='p-1 px-4 dark:bg-blue-700 w-fit flex gap-1 items-center rounded-lg shadow-lg'
    >
      {fullName}
    </Link>
  );
}

export default BorderCountry;
