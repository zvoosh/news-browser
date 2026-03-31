import { useMemo } from "react";
import { FaAngleLeft } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import api from "@api";
import type { Article, GuardianResponse } from "@types";
import { useLocation, useNavigate } from "react-router";

const truncateText = (text: string, maxLength: number = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function SingleNewsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data } = useQuery<GuardianResponse>({
    queryKey: ["latest"],
    queryFn: async () => {
      const res = await api.get(
        `search?show-fields=body,headline,byline,thumbnail&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=1&page-size=8`,
      );
      return res.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const firstFour = useMemo(() => {
    return data ? data.response.results.slice(0, 4) : [];
  }, [data]);

  const secondFour = useMemo(() => {
    return data ? data.response.results.splice(4) : [];
  }, [data]);

  return (
    <div className="w-full h-full mt-30">
      <div className="flex flex-col lg:flex-row lg:gap-5 px-5">
        <div
          onClick={() => {
            navigate(-1);
            const mainDiv = document.getElementById("main");
            if (mainDiv) {
              mainDiv.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
          className="flex gap-2 items-center pl-5 md:pl-10 underline underline-offset-4 text-blue-400 lg:hidden"
        >
          <FaAngleLeft />
          <span>Back</span>
        </div>
        <div className="w-1/3 xl:w-1/5 hidden lg:flex">
          <div className="space-y-[20px]">
            {firstFour &&
              firstFour.map((item: Article) => (
                <div
                  key={item.id}
                  className="relative cursor-pointer"
                  onClick={() => {
                    navigate(`/${truncateText(item.fields.headline, 10)}`, {
                      state: { item: item },
                    });
                    const mainDiv = document.getElementById("main");
                    if (mainDiv) {
                      mainDiv.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {item.fields.thumbnail ? (
                    <img
                      src={item.fields.thumbnail}
                      alt="latest news"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="rounded-md w-full h-full bg-gray-500/40 flex justify-center items-center">
                      No image found
                    </div>
                  )}
                  <div className="absolute bottom-0 p-3 font-semibold w-full backdrop-blur-3xl text-white">
                    {truncateText(item.fields.headline, 30)}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {location.state.item && (
          <div className="w-full p-5 lg:w-3/5 space-y-[40px] md:px-10 lg:px-5">
            <div className="space-y-[20px]">
              <h2 className="text-2xl font-semibold">
                {location.state.item.fields.headline}
              </h2>
              <div className="flex justify-between items-end -mb-[35px]">
                <div className="w-3/5">
                  by:{" "}
                  {location.state.item.fields.byline
                    ? location.state.item.fields.byline
                    : "unknown"}
                </div>
                <div>
                  {dayjs(location.state.item.webPublicationDate).format(
                    "MMM D[,] YYYY",
                  )}
                </div>
              </div>
            </div>
            <div className="w-full aspect-video">
              {location.state.item.fields.thumbnail ? (
                <img
                  src={location.state.item.fields.thumbnail}
                  alt="Single Article Thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="rounded-md w-full h-full bg-gray-500/40 flex justify-center items-center">
                  No image found
                </div>
              )}
            </div>
            <div className="px-1 lg:px-5">
              <p
                className="space-y-5"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(location.state.item.fields.body),
                }}
              ></p>
            </div>
          </div>
        )}
        <div className="w-full p-5 block lg:hidden">
          <div className="space-y-[20px] flex flex-wrap justify-center gap-5">
            {firstFour &&
              firstFour.map((item: Article) => (
                <div
                  key={item.id}
                  className="relative cursor-pointer w-[400px] rounded-md"
                  onClick={() => {
                    navigate(`/${truncateText(item.fields.headline, 10)}`, {
                      state: { item: item },
                    });
                    const mainDiv = document.getElementById("main");
                    if (mainDiv) {
                      mainDiv.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {item.fields.thumbnail ? (
                    <img
                      src={item.fields.thumbnail}
                      alt="latest news"
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <div className="rounded-md w-full h-full bg-gray-500/40 flex justify-center items-center">
                      No image found
                    </div>
                  )}
                  <div className="absolute bottom-0 p-3 font-semibold w-full backdrop-blur-3xl text-white rounded-b-md">
                    {truncateText(item.fields.headline, 30)}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/3 xl:w-1/5 hidden xl:flex">
          <div className="space-y-[20px]">
            {secondFour &&
              secondFour.map((item: Article) => (
                <div
                  key={item.id}
                  className="relative cursor-pointer"
                  onClick={() => {
                    navigate(`/${truncateText(item.fields.headline, 10)}`, {
                      state: { item: item },
                    });
                    const mainDiv = document.getElementById("main");
                    if (mainDiv) {
                      mainDiv.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {item.fields.thumbnail ? (
                    <img
                      src={item.fields.thumbnail}
                      alt="latest news"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="rounded-md w-full h-full bg-gray-500/40 flex justify-center items-center">
                      No image found
                    </div>
                  )}
                  <div className="absolute bottom-0 p-3 font-semibold w-full backdrop-blur-3xl text-white">
                    {truncateText(item.fields.headline, 30)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
