import type { Article } from "../types/types";

export default function LatestThreeNews({ items }: { items?: Article[] }) {
  return (
    <>
      {items ? (
        <div className="flex flex-col px-5 lg:flex-row lg:justify-center gap-5 mt-20 min-h-[525px] lg:h-[525px] w-full">
          {/* Leva strana */}
          <div className="w-full lg:w-1/2 relative cursor-pointer group">
            {items[0] && (
              <>
                <img
                  src={items[0].fields.thumbnail}
                  alt=""
                  className="w-full h-full object-cover max-h-[355px] lg:max-h-none"
                />
                <div
                  className="absolute bottom-0 h-1/2 w-full 
                bg-linear-to-t from-black to-transparent 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-200"
                ></div>
                <div className="absolute bottom-0 p-3 font-semibold text-xl w-full backdrop-blur-3xl text-white">
                  {items[0].fields.headline}
                </div>
              </>
            )}
          </div>

          {/* Desna strana */}
          <div className="w-full lg:w-1/2 flex flex-col h-full divide-y-20 divide-transparent">
            <div className="w-full h-1/2 relative cursor-pointer group">
              {items[1] && (
                <>
                  <img
                    src={items[1].fields.thumbnail}
                    alt=""
                    className="w-full h-full object-cover max-h-[355px] lg:max-h-none"
                  />
                  <div
                    className="absolute bottom-0 h-1/2 w-full 
                  bg-linear-to-t from-black to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200"
                  ></div>
                  <div className="absolute bottom-0 p-3 font-semibold text-xl w-full backdrop-blur-3xl text-white">
                    {items[1].fields.headline}
                  </div>
                </>
              )}
            </div>
            <div className="w-full h-1/2 relative cursor-pointer group">
              {items[2] && (
                <>
                  <img
                    src={items[2].fields.thumbnail}
                    alt=""
                    className="w-full h-full object-cover max-h-[355px] lg:max-h-none"
                  />
                  <div
                    className="absolute bottom-0 h-1/2 w-full 
                  bg-linear-to-t from-black to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200"
                  ></div>
                  <div className="absolute bottom-0 p-3 font-semibold text-xl w-full backdrop-blur-3xl text-white">
                    {items[2].fields.headline}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
