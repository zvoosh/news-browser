import api from "@api";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@types";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router";
import DOMPurify from "dompurify";

export default function SingleNewsPage() {
  const location = useLocation();

  const { data, isError } = useQuery<Article>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await api.get(
        `/${location.state.id}?show-fields=body,headline,byline,thumbnail&api-key=67a28272-3250-4204-b651-0a21af15a7d7`,
      );
      return res.data.response.content;
    },
  });

  if (isError) {
    return (
      <div className="w-full h-full mt-20 font-semibold text-lg">
        Error fetching the article. No such article. Go back to the{" "}
        <Link to={"/"} className="underline text-blue-200">
          Home
        </Link>{" "}
        page.
      </div>
    );
  }

  return (
    <div className="w-full h-full mt-30">
      <div className="flex gap-5">
        <div className="w-1/5">1</div>
        {data && (
          <div className="w-3/5 space-y-[40px]">
            <div className="space-y-[20px]">
              <h2 className="text-2xl font-semibold">{data.fields.headline}</h2>
              <div className="flex justify-between -mb-[35px]">
                <div>by: {data.fields.byline}</div>
                <div>
                  {dayjs(data.webPublicationDate).format("MMM D[,] YYYY")}
                </div>
              </div>
            </div>
            <div className="w-full aspect-video">
              <img
                src={data.fields.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.fields.body),
                }}
              ></p>
            </div>
          </div>
        )}
        <div className="w-1/5">3</div>
      </div>
    </div>
  );
}
