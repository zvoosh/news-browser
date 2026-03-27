import { useQuery } from "@tanstack/react-query";
import api from "@api/api";
import { div } from "framer-motion/client";

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get(
        "search?q=climate&show-fields=body,headline,byline,thumbnail&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=1&page-size=10",
      );
      return res.data;
    },
  });

  if (data && data.response) {
    console.log("data", data.response.results);
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;

  return (
    <div className="w-full h-full pt-10">
      {/* title section */}
      <div className="max-w-[800px]">
        <h1 className="text-5xl font-medium leading-17">
          <span className="font-bold">Upgrade</span> your tech life with how-to{" "}
          <span className="font-bold">advice</span>,{" "}
          <span className="font-bold">news</span> and{" "}
          <span className="font-bold">tips</span>.
        </h1>
      </div>
      <div className="h-0.5 w-screen absolute left-0 mt-10 bg-white"></div>
      {/* Latest News */}
      <div className="flex gap-5 mt-20 h-[525px] w-full">
        {/* Leva strana */}
        <div className="w-1/2 relative cursor-pointer">
          {data?.response && (
            <>
              <img
                src={data.response.results[0].fields.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 p-3 font-semibold text-xl bg-gray-500/20 w-full backdrop-blur-3xl ">
                {data.response.results[0].fields.headline}
              </div>
            </>
          )}
        </div>

        {/* Desna strana */}
        <div className="w-1/2 flex flex-col h-full divide-y-20 divide-transparent">
          <div className="w-full h-1/2 relative cursor-pointer">
            {data?.response && (
              <>
                <img
                  src={data.response.results[1].fields.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 p-3 font-semibold text-xl bg-gray-500/20 w-full backdrop-blur-3xl">
                  {data.response.results[1].fields.headline}
                </div>
              </>
            )}
          </div>
          <div className="w-full h-1/2 relative cursor-pointer">
            {data?.response && (
              <>
                <img
                  src={data.response.results[2].fields.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 p-3 font-semibold text-xl bg-gray-500/20 w-full backdrop-blur-3xl">
                  {data.response.results[2].fields.headline}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
