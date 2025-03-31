const Skeleton = () => {
  return (
    <div 
      className="min-h-[36.5rem] w-full bg-gray-200 dark:bg-blue-700 rounded-lg shadow-lg animate-pulse"
      aria-label="Loading content"
      role="status"
    ></div>
  );
};

export default Skeleton;