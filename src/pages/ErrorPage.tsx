import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: unknown = useRouteError();
  console.log(error);
  console.error(error);

  return (
    <div
      id='error-page'
      className='min-h-[90vh] grid place-items-center dark:bg-blue-900 dark:text-white'
    >
      <div className='grid gap-3 text-center'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {(error as Error)?.message ||
              (error as { statusText?: string })?.statusText}
          </i>
        </p>
      </div>
    </div>
  );
}
