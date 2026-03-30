import api from "@api";
import { useQuery } from "@tanstack/react-query";
import type { Article, GuardianResponse } from "@types";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router";
import DOMPurify from "dompurify";

const truncateText = (text: string, maxLength: number = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function SingleNewsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: latest } = useQuery<GuardianResponse>({
    queryKey: ["latest"],
    queryFn: async () => {
      const res = await api.get(
        `search?show-fields=body,headline,byline,thumbnail&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=1&page-size=4`,
      );
      return res.data;
    },
  });

  console.log("location.state.item", location.state.item)

  return (
    <div className="w-full h-full mt-30">
      <div className="flex gap-5">
        <div className="w-1/5">
          <div className="space-y-[20px]">
            {latest &&
              latest.response.results.map((item: Article) => (
                <div
                  key={item.id}
                  className="relative cursor-pointer"
                  onClick={() => {
                    navigate(`/${truncateText(item.fields.headline, 10)}`, {
                      state: { id: item.id },
                    });
                  }}
                >
                  {item.fields.thumbnail ? (
                    <img src={item.fields.thumbnail} alt="latest news" />
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
          <div className="w-3/5 space-y-[40px]">
            <div className="space-y-[20px]">
              <h2 className="text-2xl font-semibold">
                {location.state.item.fields.headline}
              </h2>
              <div className="flex justify-between -mb-[35px]">
                <div>by: {location.state.item.fields.byline}</div>
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
            <div className="px-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(location.state.item.fields.body),
                }}
              ></p>
            </div>
          </div>
        )}
        <div className="w-1/5"></div>
      </div>
    </div>
  );
}
